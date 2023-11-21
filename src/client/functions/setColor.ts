
const reset= '\x1b[0m'
const colors = [
     '\x1b[31m',
     '\x1b[32m',
     '\x1b[33m',
     '\x1b[34m',
     '\x1b[35m',
     '\x1b[36m',
]

export  function setColor(){
    const i = Math.round(Math.random()*6)
    return colors[i]
}

export function setResetColor(){
    return reset
}