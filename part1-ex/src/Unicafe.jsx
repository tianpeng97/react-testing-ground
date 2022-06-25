import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>
}

const StatisticLine = ({ type, score }) => {
  if (type === 'positive') {
    return (
      <tr>
        <td>{type}</td>
        <td>{score} %</td>
      </tr>
    )
  }

  return (
    <tr>
      <td>{type}</td>
      <td>{score}</td>
    </tr>
  )
}

const Statistics = ({ score }) => {
  const good = score.good
  const neutral = score.neutral
  const bad = score.bad
  const total = good + neutral + bad
  const average = (good * 1 + bad * -1) / total
  const positive = (good * 100) / total

  if (total === 0) {
    return <div>No feedback</div>
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine type="good" score={good} />
          <StatisticLine type="neutral" score={neutral} />
          <StatisticLine type="bad" score={bad} />
          <StatisticLine type="all" score={total} />
          <StatisticLine type="average" score={average} />
          <StatisticLine type="positive" score={positive} />
        </tbody>
      </table>
    </div>
  )
}

const Unicafe = () => {
  const [score, setScore] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  })

  const increaseGood = () => {
    setScore({ ...score, good: score.good + 1 })
  }
  const increaseNeutral = () => {
    setScore({ ...score, neutral: score.neutral + 1 })
  }
  const increaseBad = () => {
    setScore({ ...score, bad: score.bad + 1 })
  }

  return (
    <>
      <h1>give feedback</h1>
      <div>
        <Button handleClick={increaseGood} text="good" />
        <Button handleClick={increaseNeutral} text="neutral" />
        <Button handleClick={increaseBad} text="bad" />
      </div>

      <h1>statistics</h1>
      <Statistics score={score} />
    </>
  )
}

export default Unicafe
