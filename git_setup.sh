#!/bin/bash

echo "🎭 Starting Theatre Watson Git Setup..."

# 1. Initialize Git
git init

# 2. Add files
git add .

# 3. Commit
git commit -m "Initial launch"

# 4. Rename branch
git branch -M main

# 5. Remote URL
# We remove any existing link first to be safe
git remote remove origin 2>/dev/null
# We use your specific URL found in the screenshot
git remote add origin https://github.com/RichardMPS/theatre-watson.git

# 6. Push
git push -u origin main

echo "✅ Success! Your code is now on GitHub."