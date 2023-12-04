import React, { useState, useEffect } from 'react';

const BotCollection = ({ handleBotClick, handleDeleteBot }) => {
  const [bots, setBots] = useState([]);

  useEffect(() => {
    // Fetch bots data when the component mounts
    fetch("http://localhost:8002/bots")
      .then(response => response.json())
      .then(bots => setBots(bots));
  }, []);

  const handleDelete = (bot) => {
    // Call the handleDeleteBot function to delete the bot
    handleDeleteBot(bot);

    // Remove the bot from the local state
    setBots(prevBots => prevBots.filter(b => b.id !== bot.id));
  };

  return (
    <div className="bot-collection" style={{ width: '100%', overflowX: 'auto', whiteSpace: 'nowrap' }}>
      {bots.map(bot => (
        <div
          key={bot.id}
          className="bot-container"
          onClick={() => handleBotClick(bot)}
        >
          <img src={bot.avatar_url} alt={bot.name} className="bot-image" />
          <div className="bot-info">
            <p>Name: {bot.name}</p>
            <p>Health: {bot.health}</p>
            <p>Damage: {bot.damage}</p>
            <p>Armor: {bot.armor}</p>
            <p>Class: {bot.bot_class}</p>
            <p>Catchphrase: {bot.catchphrase}</p>
            <button style={{ color: 'red' }} onClick={() => handleDelete(bot)}>X</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BotCollection;











