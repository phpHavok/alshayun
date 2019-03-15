The **Towers of Hanoi** is a mathematical puzzle consisting of three rods and one or more rings of varying size. The rods are labeled **S** for source, **M** for middle, and **T** for target. The puzzle begins with all rings sitting on rod **S** in descending order of size. More precisely, given any ring **r,** all rings above **r** are smaller in size than **r.** The goal of the puzzle is to move all rings from rod **S** to rod **T** whilst maintaining the aforementioned sizing condition.

Use the below applet to play through the 3-ring Towers of Hanoi example. You may step through the solution frame by frame to observe the moves.

<applet name="hanoi" data-num-rings="3" width="50%"></applet>

A beautifully simple iterative algorithm exists for solving the Towers of Hanoi problem. To begin discussing the algorithm, a couple more definitions are necessary. The rods are traditionally placed in a circle where the terms **clockwise** and **counterclockwise** are apparent. However, these applets display the rods in a line. Therefore, to be clear, we define the following movements.

A **clockwise** movement is the movement of a ring from rod **S** to rod **M**, from rod **M** to rod **T**, or from rod **T** to rod **S**. Likewise, a **counterclockwise** movement is the movement of a ring from rod **S** to rod **T**, from rod **T** to rod **M**, or from rod **M** to rod **S.**

The iterative algorithm consists of two steps which repeat until all rings are sitting on rod **T.** We define direction **d** as clockwise if the number of rings is even and counterclockwise if the number of rings is odd.

1. Move the smallest ring one rod in direction **d.**
2. Perform the only remaining valid move.

A valid move is moving a ring onto another rod on top of a larger ring or moving a ring onto an empty rod. Because of the ring-sizing invariant, there will only be one valid move on step two, so there is no ambiguity.

Observe the three- and four- ring examples to see how the smallest ring moves in an odd-ring and even-ring case.

<center>
<table>
<tr>
<td><applet name="hanoi" data-num-rings="3"></applet></td>
<td><applet name="hanoi" data-num-rings="4"></applet></td>
</tr>
</table>
</center>

A beautifully simple algorithm indeed. In conclusion, experiment with an 8-ring example.

<applet name="hanoi" data-num-rings="8" width="50%"></applet>
