const planeRequired = (fuel) => {
    let n = fuel.length;
    if (n === 1) return 0;

    let planesUsed = 0;
    let maxReach = 0;
    let currentEnd = 0;
    let i = 0;

    console.log("Initial State:", { n, fuel, planesUsed, maxReach, currentEnd, i });

    while (currentEnd < n - 1) {
        console.log("Current Loop Start:", { planesUsed, currentEnd, maxReach, i });
        let prevMaxReach = maxReach;
        while (i <= currentEnd) {
            maxReach = Math.max(maxReach, i + fuel[i]);
            console.log(`Checking Airport ${i + 1}:`, { fuel: fuel[i], maxReach, i });
            i++;
        }

        if (maxReach <= currentEnd) {
            console.log("Stuck! Cannot move further.");
            return -1;
        }

        currentEnd = maxReach;
        planesUsed++;
        console.log("Hired a plane. Updated state:", { planesUsed, currentEnd, maxReach, prevMaxReach });
    }

    console.log("Final State:", { planesUsed });
    return planesUsed;
}

console.log("Output:", planeRequired([2, 1, 2, 3, 1]));

console.log("Output:", planeRequired([1, 6, 3, 4, 5, 0, 0, 0, 6]));