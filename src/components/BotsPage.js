import React, { useState, useEffect } from 'react';
import YourBotArmy from './YourBotArmy';
import BotCollection from './BotCollection';

function BotsPage() {
  const [yourBotArmy, setYourBotArmy] = useState([]);
  const [enlistedBots, setEnlistedBots] = useState([]);
  const [allBots, setAllBots] = useState([]);

  useEffect(() => {
    // Fetch all bots from the backend
    fetch("http://localhost:8002/bots")
      .then(response => response.json())
      .then(data => setAllBots(data))
      .catch(error => console.error('Error fetching bots:', error));
  }, []);

  const handleBotClick = (bot) => {
    // Check if the bot is not already enlisted
    if (!enlistedBots.includes(bot.id)) {
      // Add the bot to enlistedBots and yourBotArmy
      setEnlistedBots((prevEnlistedBots) => [...prevEnlistedBots, bot.id]);
      setYourBotArmy((prevBotArmy) => [...prevBotArmy, bot]);
    }
  };

  const handleReleaseBot = (bot) => {
    // Remove the bot from enlistedBots and yourBotArmy
    setEnlistedBots((prevEnlistedBots) => prevEnlistedBots.filter(id => id !== bot.id));
    setYourBotArmy((prevBotArmy) => prevBotArmy.filter(b => b.id !== bot.id));
  };

  const handleDeleteBot = (bot) => {
    // Perform a DELETE request to the backend to delete the bot
    fetch(`http://localhost:8002/bots/${bot.id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        // Remove the bot from enlistedBots and yourBotArmy
        setEnlistedBots((prevEnlistedBots) => prevEnlistedBots.filter(id => id !== bot.id));
        setYourBotArmy((prevBotArmy) => prevBotArmy.filter(b => b.id !== bot.id));
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <YourBotArmy yourBotArmy={yourBotArmy} onReleaseBot={handleReleaseBot} onDeleteBot={handleDeleteBot} />
      <BotCollection handleBotClick={handleBotClick} handleDeleteBot={handleDeleteBot} />
    </div>
  );
}

export default BotsPage;

















