import React from 'react'

const Card = ({title} : {title: string}) => {
  return (
    <div className="bg-accent text-accent-foreground outline-1 outline-ring w-full p-10 rounded-2xl">
        <h3 className="font-bold">{title}</h3>
    </div>
  )
}

export default Card