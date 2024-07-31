export const fetchTransactionData = async () => {
    try {
        return new Promise((resolve, reject) => {
            setTimeout(() => {               
                resolve([
                    { customerId: 1, amount: 120, date: '2023-04-15' },
                    { customerId: 1, amount: 75, date: '2023-04-17' },
                    { customerId: 2, amount: 200, date: '2023-05-01' },
                    { customerId: 1, amount: 50, date: '2023-05-20' },
                    { customerId: 2, amount: 90, date: '2023-06-15' },
                    { customerId: 3, amount: 130, date: '2023-06-30' },
                ]);
            }, 1000);
        });
    } catch (error) {
        console.error('Error fetching transaction data:', error);
        throw error; 
    }
};