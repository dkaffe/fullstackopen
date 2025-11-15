import { useState } from 'react'

  const Button = ({text, onClick}) => {
    return (
      <button onClick={onClick}>{text}</button>
    )
  }

  const StatisticLine = ({stat, text}) => {
    return (
      <tr>
        <td>{text}</td>
        <td>{stat}</td>
      </tr>
    )
  }

  const Statistics = ({good, neutral, bad}) => {
    const total = good + neutral + bad

    // average score
    const average = total === 0 ? 0 : (good - bad) / total

    // percentage of positive reviews
    const positive = total === 0 ? 0 : (good / total) * 100
    
    if (total === 0) {
      return (
        <div>
          <h2>statistics</h2>
          <p>No feedback given</p>
        </div>
      )
    }

    return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" stat={good} />
          <StatisticLine text="neutral" stat={neutral} />
          <StatisticLine text="bad" stat={bad} />
          <StatisticLine text="all" stat={total} />
          <StatisticLine text="average" stat={average} />
          <StatisticLine text="positive" stat={`${positive} %`} />
        </tbody>
      </table>
    </div>
    )
  }


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' onClick={() => setGood(good + 1)}/>
      <Button text='neutral' onClick={() => setNeutral(neutral + 1)}/>
      <Button text='bad' onClick={() => setBad(bad + 1)}/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App