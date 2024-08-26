import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ordered, restocked } from './cakeSlice'

export const CakeView = () => {
  const numOfCakes = useSelector(state => state.cake.musics)
  const dispatch = useDispatch()
  return (
    <div>

      {numOfCakes.length > 0 ? numOfCakes.map(val => <h2>
        {val}
      </h2>): <h2>NOTHING</h2>}
      <button onClick={() => dispatch(ordered())}>Order Cake</button>
      <button onClick={() => dispatch(restocked(5))}>Restock Cakes</button>
    </div>
  )
}