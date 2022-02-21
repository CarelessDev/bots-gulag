# Bots Gulag

## Problem

Our server has many bots, but most of them doing nothing.

Literally just online.

By running many process, this is very laggy especially when [cocoa-grader](https://github.com/Leomotors/cocoa-grader)
the bots that use so many resources came in.

## Solution

Why not run all bots in a single process?

~~A study~~ shows that a bare nodejs process take a lot of RAM
