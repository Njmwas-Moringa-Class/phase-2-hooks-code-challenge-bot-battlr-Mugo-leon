import React from 'react';

function YourBotArmy({ yourBotArmy, onReleaseBot, onDeleteBot }) {
  const handleBotClick = (bot) => {
    // Release the bot when clicked
    onReleaseBot(bot);
  };

  return (
    <div className="ui segment inverted olive bot-army">
      <div className="ui five column grid">
        <div className="row bot-army-row">
          {yourBotArmy.map(bot => (
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
                <button style={{ color: 'red' }} onClick={() => onDeleteBot(bot)}>X</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default YourBotArmy;













