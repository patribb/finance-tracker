'use client'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const Stats = ({expenses}) => {
  return (
    <section className='py-6'>
      <a id='stats' />
      <h3 className='text-2xl font-bold'>Stats</h3>
      <div className='w-1/2 mx-auto'>
        <Doughnut
          data={{
            labels: expenses.map((expense) => expense.title),
            datasets: [
              {
                label: 'Expenses',
                data: expenses.map((expense) => expense.total),
                backgroundColor: expenses.map((expense) => expense.color),
                borderColor: ['#18181b'],
                borderWidth: 5,
              },
            ],
          }}
        />
      </div>
    </section>
  );
};
export default Stats;
