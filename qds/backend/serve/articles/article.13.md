Sorting is the art taking a set of comparable items and placing them in some defined order. In this article, we will be sorting the integers 1 to **N** (**N** will vary by example), where each integer is represented by a bar with height proportional to the integer. We will be focused on sorting integers in **ascending** order (from smallest to largest).

Over the past several decades, many sorting algorithms have been developed. Indeed, sorting is an expansive topic full of complexities and quarks. However, we will focus on two well-know algorithms: **Bubble Sort**, which is well known for being terrible, and **Insertion Sort**, which is well known for performing relatively well while being simple to understand.

Let's get started!

## Bubble Sort

**Bubble Sort** works by comparing neighboring pairs of integers. If the left integer is greater than the right integer, the two are swapped. Otherwise, the integers are left in place, and **Bubble Sort** moves onto the next pair. **Bubble Sort** repeats this process until the list is sorted.

An example pseudocode of **Bubble Sort** taken from **Wikipedia** is provided below.

```
n = length(A)
repeat
  swapped = false
  for i = 1 to n-1 inclusive do
      /* if this pair is out of order */
      if A[i-1] > A[i] then
          /* swap them and remember something changed */
          swap( A[i-1], A[i] )
          swapped = true
      end if
  end for
until not swapped
```

Observe how **Bubble Sort** behaves in the following applets. Out of place bars are colored dark gray, whereas bars in the proper place (sorted) are colored light gray. Bars being considered are colored blue. Notice how poorly **Bubble Sort** scales up from 10 to 50 bars.

### 10 Bars

<applet name="sort" width="50%" data-method="bubble" data-num-bars="10"></applet>

### 50 Bars

<applet name="sort" width="50%" data-method="bubble" data-num-bars="50"></applet>

## Insertion Sort

**Insertion Sort** works by establishing an invariant that all integers to the left of a given point are sorted and need not be looked at any further. The given point is slowly moved to the right. However, **Insertion Sort** can be thought of as working on sub-lists where the same invariant applies.

An example pseudocode of **Insertion Sort** taken from **Wikipedia** is provided below.

```
i ← 1
while i < length(A)
  j ← i
  while j > 0 and A[j-1] > A[j]
      swap A[j] and A[j-1]
      j ← j - 1
  end while
  i ← i + 1
end while
```

Observe how **Insertion Sort** scales to handle 10 bars, 50 bars, and even 100 bars. You'll notice how **Insertion Sort** tends to build up a general sorted structure throughout, sometimes resulting in a satisfying clean sweep at the end of the algorithm. This property of **Insertion Sort** makes it very efficient when operating on lists that are already mostly sorted.

### 10 Bars

<applet name="sort" width="50%" data-method="insertion" data-num-bars="10"></applet>

### 50 Bars

<applet name="sort" width="50%" data-method="insertion" data-num-bars="50"></applet>

### 100 Bars

<applet name="sort" width="50%" data-method="insertion" data-num-bars="100"></applet>