import { useEffect, useState } from "react";
const User = ({name,birthday}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <>
      <div className={name.length % 2 === 0 ? 'paire' : 'impaire'}>
      <h1> Bonjour {name}</h1>
      <h2>Nous sommes le {new Date().toLocaleDateString()}</h2>
      <h3>il est {currentTime.toLocaleTimeString()}</h3>
      <p>je suis né le {birthday.toLocaleDateString()}</p>
      <p>j'ai {new Date().getFullYear() - birthday.getFullYear()} ans</p>
      </div>
      
    </>
  )
}
export default User