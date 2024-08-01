export const fetchTransactionData = async () => {
    try {
        return new Promise((resolve, reject) => {
            setTimeout(() => {               
                resolve([
                    { customerName: 'Alice', amount: 120, date: '2023-04-15' },
                    { customerName: 'Alice', amount: 75, date: '2023-04-17' },
                    { customerName: 'Kyle', amount: 200, date: '2023-05-01' },
                    { customerName: 'Alice', amount: 50, date: '2023-05-20' },
                    { customerName: 'Kyle', amount: 90, date: '2023-06-15' },
                    { customerName: 'Fred', amount: 130, date: '2023-06-30' },
                    { customerName: 'Fred', amount: 30, date: '2023-05-30' },
                    { customerName: 'Fred', amount: 100, date: '2023-02-30' },
                    { customerName: 'Fred', amount: 390, date: '2023-01-30' },
                    { customerName: 'George', amount: 2300, date: '2023-06-30' },
                    { customerName: 'George', amount: 130, date: '2023-05-30' },
                    { customerName: 'Geordio', amount: 400, date: '2023-01-30' },
                    { customerName: 'Geordio', amount: 530, date: '2023-02-30' },
                    { customerName: 'Geordio', amount: 120, date: '2023-03-30' },
                    { customerName: 'Geordio', amount: 110, date: '2023-04-30' },
                ]);
            }, 1000);
        });
    } catch (error) {
        console.error('Error fetching transaction data:', error);
        throw error; 
    }
};