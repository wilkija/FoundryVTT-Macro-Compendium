main() 

async function main() {
    const background = canvas.scene.data

    // Does the scence have unrestricted vision on?
    // If so, change global light property to false. Toggle off
    // If not, change the global light property to true. Toggle on
    await background.globalLight == false ? background.update({'globalLight': true}) : background.update({'globalLight': false})
}