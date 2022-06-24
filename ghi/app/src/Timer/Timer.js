import { useState, useEffect } from "react";

function Timer({ count }) {
  const [counter, setCounter] = useState(count);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  return counter;
}

export default Timer;
