// src/services/mockApi.ts

// Mock data for the church management system

const mockData = {
    stats: {
        events: 12,
        finances: 50000,
        members: 150,
        attendance: 95,
        donations: 45  // Added donation count
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
        {
            key: '1',
            firstName: 'John',
            lastName: 'Smith',
            email: 'john@example.com',
            phoneNumber: '0241234567',
            gender: 'Male',
            role: 'Member',
            date: '1990-03-15',
            address: '123 Church Street, Takoradi',
        },
        {
            key: '2',
            firstName: 'Sarah',
            lastName: 'Johnson',
            email: 'sarah@example.com',
            phoneNumber: '0269876543',
            gender: 'Female',
            role: 'Elder',
            date: '1985-05-22',
            address: '45 Glory Road, Cape Coast',
        },
        {
            key: '3',
            firstName: 'Michael',
            lastName: 'Brown',
            email: 'michael@example.com',
            phoneNumber: '0272223344',
            gender: 'Male',
            role: 'Deacon',
            date: '1988-11-10',
            address: '78 Victory Lane, Accra',
        },
        {
            key: '4',
            firstName: 'Emma',
            lastName: 'Wilson',
            email: 'emma@example.com',
            phoneNumber: '0205558888',
            gender: 'Female',
            role: 'Member',
            date: '1995-02-28',
            address: '66 Peace Avenue, Kumasi',
        },
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
    },

    // New donations data
    donations: [
        {
            key: '1',
            donorName: 'John Smith',
            amount: 100,
            date: '2025-04-05',
            method: 'Cash',
            purpose: 'Building Fund',
            reference: 'DON12345',
            memberId: '1', // Reference to a member
        },
        {
            key: '2',
            donorName: 'Sarah Johnson',
            amount: 250,
            date: '2025-04-10',
            method: 'Mobile Money',
            purpose: 'Tithe',
            reference: 'DON67890',
            memberId: '2',
        },
        {
            key: '3',
            donorName: 'Michael Brown',
            amount: 500,
            date: '2025-04-15',
            method: 'Bank Transfer',
            purpose: 'Offering',
            reference: 'DON24680',
            memberId: '3',
        },
        {
            key: '4',
            donorName: 'Emma Wilson',
            amount: 175,
            date: '2025-04-20',
            method: 'Cash',
            purpose: 'Tithe',
            reference: 'DON13579',
            memberId: '4',
        },
        {
            key: '5',
            donorName: 'Anonymous Donor',
            amount: 1000,
            date: '2025-04-25',
            method: 'Bank Transfer',
            purpose: 'Building Fund',
            reference: 'DON97531',
            memberId: null, // Anonymous donation
        },
    ]
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

    addMember: async (member: any) => {
        await delay(800);
        const newMember = {
            ...member,
            key: String(mockData.members.length + 1)
        };
        mockData.members.push(newMember);
        return newMember;
    },

    updateMember: async (key: string, updatedMember: any) => {
        await delay(800);
        const index = mockData.members.findIndex(m => m.key === key);
        if (index >= 0) {
            mockData.members[index] = { ...mockData.members[index], ...updatedMember };
            return mockData.members[index];
        }
        throw new Error("Member not found");
    },

    deleteMember: async (key: string) => {
        await delay(600);
        const index = mockData.members.findIndex(m => m.key === key);
        if (index >= 0) {
            const deleted = mockData.members[index];
            mockData.members.splice(index, 1);
            return deleted;
        }
        throw new Error("Member not found");
    },

    // Finances API
    getFinances: async () => {
        await delay(1500);
        return { ...mockData.finances };
    },

    // New Donations API
    getDonations: async () => {
        await delay(1000);
        return [...mockData.donations];
    },

    getDonationsByPurpose: async (purpose: string) => {
        await delay(800);
        return mockData.donations.filter(d => d.purpose === purpose);
    },

    getDonationsByMethod: async (method: string) => {
        await delay(800);
        return mockData.donations.filter(d => d.method === method);
    },

    getDonationsByDateRange: async (startDate: string, endDate: string) => {
        await delay(1000);
        return mockData.donations.filter(d => {
            const donationDate = new Date(d.date);
            return donationDate >= new Date(startDate) && donationDate <= new Date(endDate);
        });
    },

    getDonationsByMember: async (memberId: string) => {
        await delay(800);
        return mockData.donations.filter(d => d.memberId === memberId);
    },

    addDonation: async (donation: any) => {
        await delay(800);
        const newDonation = {
            ...donation,
            key: String(mockData.donations.length + 1),
            reference: `DON${Math.floor(10000 + Math.random() * 90000)}`, // Generate random reference
        };
        mockData.donations.push(newDonation);

        // Update finances when a donation is added
        if (donation.purpose === 'Tithe') {
            mockData.finances.tithes += parseFloat(donation.amount);
        } else if (donation.purpose === 'Offering') {
            mockData.finances.offerings += parseFloat(donation.amount);
        }
        mockData.finances.income += parseFloat(donation.amount);

        return newDonation;
    },

    updateDonation: async (key: string, updatedDonation: any) => {
        await delay(800);
        const index = mockData.donations.findIndex(d => d.key === key);
        if (index >= 0) {
            // Calculate the difference in amount to update finances
            const originalDonation = mockData.donations[index];
            const amountDifference = updatedDonation.amount - originalDonation.amount;

            mockData.donations[index] = { ...mockData.donations[index], ...updatedDonation };

            // Update finances accordingly
            if (amountDifference !== 0) {
                mockData.finances.income += amountDifference;

                if (originalDonation.purpose === 'Tithe') {
                    mockData.finances.tithes += amountDifference;
                } else if (originalDonation.purpose === 'Offering') {
                    mockData.finances.offerings += amountDifference;
                }
            }

            return mockData.donations[index];
        }
        throw new Error("Donation not found");
    },

    deleteDonation: async (key: string) => {
        await delay(600);
        const index = mockData.donations.findIndex(d => d.key === key);
        if (index >= 0) {
            const deleted = mockData.donations[index];

            // Update finances when a donation is deleted
            if (deleted.purpose === 'Tithe') {
                mockData.finances.tithes -= deleted.amount;
            } else if (deleted.purpose === 'Offering') {
                mockData.finances.offerings -= deleted.amount;
            }
            mockData.finances.income -= deleted.amount;

            mockData.donations.splice(index, 1);
            return deleted;
        }
        throw new Error("Donation not found");
    },

    // Donation statistics
    getDonationStats: async () => {
        await delay(1000);

        // Calculate total donations
        const totalAmount = mockData.donations.reduce((sum, donation) => sum + donation.amount, 0);

        // Count donations by purpose
        const purposeCounts = mockData.donations.reduce((counts, donation) => {
            counts[donation.purpose] = (counts[donation.purpose] || 0) + 1;
            return counts;
        }, {} as Record<string, number>);

        // Sum donations by purpose
        const purposeTotals = mockData.donations.reduce((totals, donation) => {
            totals[donation.purpose] = (totals[donation.purpose] || 0) + donation.amount;
            return totals;
        }, {} as Record<string, number>);

        // Sum donations by method
        const methodTotals = mockData.donations.reduce((totals, donation) => {
            totals[donation.method] = (totals[donation.method] || 0) + donation.amount;
            return totals;
        }, {} as Record<string, number>);

        // Get monthly donation trends
        const monthlyTrends = monthlyDonationTrends();

        return {
            totalAmount,
            donationCount: mockData.donations.length,
            purposeCounts,
            purposeTotals,
            methodTotals,
            monthlyTrends
        };
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

// Helper function to generate monthly donation trends
function monthlyDonationTrends() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
    const purposes = ['Tithe', 'Offering', 'Building Fund'];

    return months.map(month => {
        const result: any = { month };

        purposes.forEach(purpose => {
            // Generate a somewhat realistic and consistent value
            const baseValue = purpose === 'Tithe' ? 5000 :
                purpose === 'Offering' ? 3000 : 2000;
            const randomFactor = 0.7 + Math.random() * 0.6; // Between 0.7 and 1.3
            result[purpose] = Math.round(baseValue * randomFactor);
        });

        result.total = purposes.reduce((sum, purpose) => sum + result[purpose], 0);

        return result;
    });
}

// Example usage of the error handler:
// export const getStatsWithErrors = () => mockApi.withErrorHandling(() => mockApi.getStats());