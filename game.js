// Game Object to keep everything organized
const game = {
    gold: 0,
    totalGPS: 0,

    // Define our upgrades
    upgrades: {
        autoClicker: {
            count: 0,
            cost: 10,
            income: 1 // How much gold it gives per second
        }
    },

    // 1. Manual Click Logic
    click: function() {
        this.paper++;
        this.updateDisplay();
    },

    // 2. Purchase Logic
    buyUpgrade: function(upgradeKey) {
        const upgrade = this.upgrades[upgradeKey];
        
        if (this.gold >= upgrade.cost) {
            this.gold -= upgrade.cost;
            upgrade.count++;
            
            // Increase cost for the next one (classic idle scaling)
            upgrade.cost = Math.floor(upgrade.cost * 1.15);
            
            this.calculateGPS();
            this.updateDisplay();
        } else {
            alert("Not enough gold!");
        }
    },

    // 3. Math Logic: Calculate total income
    calculateGPS: function() {
        let currentGPS = 0;
        for (let key in this.upgrades) {
            currentGPS += this.upgrades[key].count * this.upgrades[key].income;
        }
        this.totalGPS = currentGPS;
    },

    // 4. UI Logic: Update the HTML text
    updateDisplay: function() {
        document.getElementById('gold-count').innerText = Math.floor(this.gold);
        document.getElementById('gps-count').innerText = this.totalGPS;
        document.getElementById('buy-auto-clicker').innerText = 
            `Buy Auto-Clicker (Cost: ${this.upgrades.autoClicker.cost})`;
    },

    // 5. The Core Loop: Runs every 1000ms (1 second)
    loop: function() {
        this.gold += this.totalGPS;
        this.updateDisplay();
    }
};

// Start the game loop
setInterval(() => {
    game.loop();
}, 1000);
