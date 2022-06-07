main()

async function main() {
    // Ensures that a token is selected.
    if (!actor) {
        ui.notifications.error('Please select a token');
        return; 
    }
    let char = canvas.tokens.controlled[0];

    // Does the token already have a light source?
    if (char.data.light.bright > 0 || char.data.light.dim > 0) { 
        // If so, toggle off the torch by resetting light properties to default.
        await char.data.light.update({'animation': {'type': 'none'}, 'bright': 0, 'dim': 0, 'color': ''})
    } else {
        // If not, add 20 ft of bright light and 20 ft of dim light.
        await char.data.light.update({'animation': {'type': 'torch'}, 'bright': 20, 'dim': 40, 'color': '#f29b4a'})
    }  
}