// src/services/mockApi.ts

// Mock data for the church management system
const mockData = {
    stats: {
        events: 12,
        finances: 5000,
        members: 150,
        attendance: 95
    },

    events: [
        {
            key: '1',
            eventName: 'Sunday Service',
            location: 'Main Sanctuary',
            date: '2025-05-04',
            description: 'Regular Sunday worship service.',
        },
        {
            key: '2',
            eventName: 'Prayer Meeting',
            location: 'Prayer Room',
            date: '2025-05-07',
            description: 'Weekly prayer gathering for church members.',
        },
        {
            key: '3',
            eventName: 'Youth Fellowship',
            location: 'Youth Center',
            date: '2025-05-10',
            description: 'Fellowship and Bible study for youth members.',
        },
        {
            key: '4',
            eventName: 'Choir Practice',
            location: 'Choir Room',
            date: '2025-05-12',
            description: 'Weekly practice for the church choir.',
        },
    ],

    members: [
        { id: 1, name: 'John Smith', email: 'john@example.com', role: 'Member', joinDate: '2020-03-15' },
        { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Elder', joinDate: '2018-05-22' },
        { id: 3, name: 'Michael Brown', email: 'michael@example.com', role: 'Deacon', joinDate: '2019-11-10' },
        { id: 4, name: 'Emma Wilson', email: 'emma@example.com', role: 'Member', joinDate: '2021-02-28' },
    ],

    finances: {
        income: 15000,
        expenses: 10000,
        tithes: 8000,
        offerings: 5000,
        monthlyTrend: [
            { month: 'Jan', income: 12000, expenses: 9500 },
            { month: 'Feb', income: 13500, expenses: 9800 },
            { month: 'Mar', income: 14000, expenses: 10200 },
            { month: 'Apr', income: 15000, expenses: 10000 },
        ]
    }
};

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API service functions
export const mockApi = {
    // Stats API
    getStats: async () => {
        await delay(800); // Simulate network delay
        return { ...mockData.stats };
    },

    // Events API
    getEvents: async () => {
        await delay(1000);
        return [...mockData.events];
    },

    addEvent: async (event: any) => {
        await delay(800);
        const newEvent = {
            ...event,
            key: String(mockData.events.length + 1)
        };
        mockData.events.push(newEvent);
        return newEvent;
    },

    updateEvent: async (key: string, event: any) => {
        await delay(800);
        const index = mockData.events.findIndex(e => e.key === key);
        if (index >= 0) {
            mockData.events[index] = { ...mockData.events[index], ...event };
            return mockData.events[index];
        }
        throw new Error("Event not found");
    },

    deleteEvent: async (key: string) => {
        await delay(600);
        const index = mockData.events.findIndex(e => e.key === key);
        if (index >= 0) {
            const deleted = mockData.events[index];
            mockData.events.splice(index, 1);
            return deleted;
        }
        throw new Error("Event not found");
    },

    // Members API
    getMembers: async () => {
        await delay(1200);
        return [...mockData.members];
    },

    // Finances API
    getFinances: async () => {
        await delay(1500);
        return { ...mockData.finances };
    },

    // Common error handler wrapper for simulating occasional failures
    withErrorHandling: <T>(apiCall: () => Promise<T>): Promise<T> => {
        // Create a 10% chance of API failure to test error handling
        const shouldFail = Math.random() < 0.1;

        if (shouldFail) {
            return Promise.reject(new Error("Simulated API failure"));
        }

        return apiCall();
    }
};

// Example usage of the error handler:
// export const getStatsWithErrors = () => mockApi.withErrorHandling(() => mockApi.getStats());