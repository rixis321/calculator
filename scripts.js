let total = 0;
let buffer = "0";
let previousOperator = null;
const screen = document.querySelector(".result");


document.querySelector(".calc-buttons").addEventListener("click",function (event) {
buttonClick(event.target.innerText);
console.log(event.target);
})

function buttonClick(value)
{
    if(isNaN(parseInt(value)))
    {
        handleSymbol(value);
    }
    else
    {
        handleNumber(value);
    }

    rerender();

}

function handleSymbol(value)
{
    switch (value)
    {
        case "C":
            buffer = "0";
            total = 0;
            previousOperator = null;
            break;
        case "=":
            if(previousOperator === null)
            {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = "" + total;
            total = 0;
            break;
        case "←":
            if(buffer.length === 1)
            {
                buffer = "0";
            }
            else
            {
                buffer = buffer.substring(0,buffer.length - 1);
            }
            break;
        default:
            handleMath(value);
            break;
    }
}

function handleMath(value)
{
    const intBuffer = parseInt(buffer);
    if(total === 0)
    {
        total = intBuffer;
    }
    else
    {
        flushOperation(intBuffer);
    }

    previousOperator = value;
    buffer = "0";
}

function flushOperation(intBuffer)
{
    if(previousOperator === "+")
    {
        total += intBuffer;
    }
    else if(previousOperator === "-")
    {
        total -= intBuffer;
    }
    else if(previousOperator === "x")
    {
        total *= intBuffer;
    }
    else
    {
        total /= intBuffer;
    }

}
function handleNumber(value)
{
    if(buffer === "0")
    {
        buffer = value;

    }
    else
    {
        buffer += value;
    }

}

function rerender()
{
    screen.innerText = buffer;
}