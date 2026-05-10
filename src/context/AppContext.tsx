import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from 'react';

import {
    loginUser,
    getTasks,
    createTask,
    toggleTaskStatus,
    deleteTask as deleteTaskDB
} from '../database/database';

export type TaskCategory = 'penting' | 'biasa';

export interface Task {
    id: number;
    user_id: number;
    title: string;
    description: string;
    due_date: string;
    category: TaskCategory;
    is_completed: number;
    created_at: string;
}

interface User {
    id: number;
    username: string;
}

interface AppContextType {
    user: User | null;

    isLoggedIn: boolean;

    login: (
        username: string,
        password: string
    ) => Promise<boolean>;

    logout: () => void;

    tasks: Task[];
    fetchTasks: () => Promise<void>;
    addTask: (data: {
        title: string;
        description: string;
        due_date: string;
        category: TaskCategory;
    }) => Promise<void>;

    toggleTask: (id: number, status: number) => Promise<void>;
    deleteTask: (id: number) => Promise<void>;
}

const AppContext =
    createContext<AppContextType | null>(
        null
    );

export function AppProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);

    const login = async (username: string, password: string) => {
        const loggedUser = await loginUser(username, password);
        if (!loggedUser) {
            return false;
        }

        setUser(loggedUser);
        return true;
    };

    const logout = () => {
        setUser(null);

        setTasks([]);
    };

    const fetchTasks = async () => {
        if (!user) {
            return;
        }
        const data = await getTasks(user.id);
        setTasks(data as Task[]);
    };

    const addTask = async ({
        title,
        description,
        due_date,
        category,
    }: {
        title: string;
        description: string;
        due_date: string;
        category: TaskCategory;
    }) => {
        if (!user) return;

        await createTask({
            user_id: user.id,
            title,
            description,
            due_date,
            category,
        });

        await fetchTasks();
    };

    const toggleTask = async (id: number, status: number) => {
        await toggleTaskStatus(id, status);
        await fetchTasks();
    }

    const deleteTask = async (id: number) => {
        await deleteTaskDB(id);
        await fetchTasks();
    }

    useEffect(() => {
        const load = async () => {
            if (!user) return;
            const data = await getTasks(user.id);
            setTasks(data as Task[]);
        };
        load();
    }, [user]);

    return (
        <AppContext.Provider
            value={{
                user,
                isLoggedIn: !!user,
                login,
                logout,
                tasks,
                fetchTasks,
                addTask,
                toggleTask,
                deleteTask,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error(
            'useApp must be used within an AppProvider'
        );
    }

    return context;
}
