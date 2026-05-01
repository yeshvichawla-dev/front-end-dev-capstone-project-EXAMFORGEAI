// Seed questions - BCA Curriculum Topics
// Open Trivia Database API: https://opentdb.com/api.php?amount=50&category=18&difficulty=hard&type=multiple
// Category 18 = Science: Computers & Technology
// Each topic has 15 questions: 5 easy, 5 medium, 5 hard
export const SEED_QUESTIONS = {
  // Semester 1 Topics
// 15 questions per topic: 5 easy, 5 medium, 5 hard
  // Topics aligned with BCA curriculum and Open Trivia DB category 18 (Computers & Technology)
  "Data & Information": [
    // Easy (5)
    { id: 101, q: "What is data?", opts: ["Raw facts and figures","Processed information","Knowledge","Insights"], ans: 0, diff: "easy", explanation: "Data consists of raw, unprocessed facts and figures that need to be analyzed to become information." },
    { id: 102, q: "What is information?", opts: ["Raw data","Processed data that has meaning","Just numbers","Stored files"], ans: 1, diff: "easy", explanation: "Information is processed data that has meaning and is useful for decision-making." },
    { id: 103, q: "Which is an example of qualitative data?", opts: ["Temperature","Height","Customer feedback","Age"], ans: 2, diff: "easy", explanation: "Qualitative data describes qualities or characteristics." },
    { id: 104, q: "What is primary data?", opts: ["Already published data","Data collected for specific purpose","Derived data","Secondary data"], ans: 1, diff: "easy", explanation: "Primary data is collected firsthand for a specific research purpose." },
    { id: 105, q: "What is secondary data?", opts: ["Newly collected data","Data from government reports","Data from published sources","Interview data"], ans: 2, diff: "easy", explanation: "Secondary data is already collected and published by others for different purposes." },
    // Medium (5)
    { id: 106, q: "What is the difference between data and information?", opts: ["No difference","Data is raw; Information is processed","Information is raw","Data needs no processing"], ans: 1, diff: "medium", explanation: "Data becomes information when it is processed and structured to have meaning." },
    { id: 107, q: "What is metadata?", opts: ["Data about data","Processed data","Raw data","Encrypted data"], ans: 0, diff: "medium", explanation: "Metadata provides information about other data - like file size, creation date, format." },
    { id: 108, q: "Which is an example of structured data?", opts: ["Email text","JSON file","Social media post","Audio file"], ans: 1, diff: "medium", explanation: "Structured data follows a predefined schema, typically stored in databases." },
    { id: 109, q: "What is data validation?", opts: ["Encrypting data","Checking data for accuracy and consistency","Compressing data","Deleting data"], ans: 1, diff: "medium", explanation: "Data validation ensures data meets quality standards before processing." },
    { id: 110, q: "What is data warehousing?", opts: ["Storing data in files","Centralized repository for analytics","Backup storage","Cloud storage only"], ans: 1, diff: "medium", explanation: "A data warehouse is a central repository for data from multiple sources for analytics." },
    // Hard (5)
    { id: 111, q: "What is the first step in decision making?", opts: ["Implement solution","Define the problem","Evaluate alternatives","Take action"], ans: 1, diff: "hard", explanation: "The first step is to clearly define the problem that needs a decision." },
    { id: 112, q: "Which model follows a step-by-step approach?", opts: ["Intuitive model","Rational model","Political model","Garbage can model"], ans: 1, diff: "hard", explanation: "The rational model follows a systematic, logical approach to decision making." },
    { id: 113, q: "What is bounded rationality?", opts: ["Unlimited choices","Decisions made under constraints","Perfect decisions","Random decisions"], ans: 1, diff: "hard", explanation: "Bounded rationality recognizes limited time, information, and cognitive ability." },
    { id: 114, q: "Decision trees help in:", opts: ["Storing data","Visualizing decision options and outcomes","Creating reports","Designing systems"], ans: 1, diff: "hard", explanation: "Decision trees diagram various choices and their potential outcomes." },
    { id: 115, q: "What is satisficing in decision making?", opts: ["Finding the perfect solution","Choosing a satisfactory solution","Making quick decisions","Avoiding decisions"], ans: 1, diff: "hard", explanation: "Satisficing means choosing a solution that meets minimum requirements." },
  ],
  "Decision Making Basics": [
    // Easy (5)
    { id: 121, q: "What is a decision?", opts: ["A guess","A choice between alternatives","A random selection","A command"], ans: 1, diff: "easy", explanation: "A decision is a choice made from available alternatives." },
    { id: 122, q: "What is the rational decision-making model?", opts: ["Follow instincts","Systematic step-by-step approach","Random selection","Copy others"], ans: 1, diff: "easy", explanation: "The rational model follows a logical, systematic process." },
    { id: 123, q: "What is a decision tree?", opts: ["A data structure for storage","A visual flowchart of decisions","A mathematical formula","A programming loop"], ans: 1, diff: "easy", explanation: "Decision trees visualize choices and their outcomes." },
    { id: 124, q: "What is risk in decision making?", opts: ["A certainty","The possibility of negative outcomes","A mathematical calculation","A type of analysis"], ans: 1, diff: "easy", explanation: "Risk represents the chance of an undesirable outcome." },
    { id: 125, q: "What is decision support?", opts: ["Making decisions for you","Tools and techniques to aid decision-making","Replacing human decisions","Automatic decision-making"], ans: 1, diff: "easy", explanation: "Decision support systems help humans make better decisions." },
    // Medium (5)
    { id: 126, q: "What is groupthink in decision making?", opts: ["Individual decision","Concensus without critical evaluation","Random selection","Expert-only decision"], ans: 1, diff: "medium", explanation: "Groupthink occurs when group uniformity overrides realistic evaluation." },
    { id: 127, q: "What is a SWOT analysis?", opts: ["A programming algorithm","Strengths, Weaknesses, Opportunities, Threats","A decision matrix","A brainstroming technique"], ans: 1, diff: "medium", explanation: "SWOT is a strategic planning tool for evaluating business position." },
    { id: 128, q: "What is the Delphi technique?", opts: ["A programming method","Anonymous expert consensus","A voting system","A random selection method"], ans: 1, diff: "medium", explanation: "Delphi uses anonymous surveys to reach expert consensus." },
    { id: 129, q: "What is multi-criteria decision analysis?", opts: ["Single criterion decisions","Evaluating multiple criteria simultaneously","Group decisions","Random decisions"], ans: 1, diff: "medium", explanation: "MCDA evaluates alternatives based on multiple criteria with weights." },
    { id: 130, q: "What is a payoff matrix?", opts: ["A game theory tool showing outcomes","A spreadsheet","A decision tree","A flowchart"], ans: 0, diff: "medium", explanation: "A payoff matrix shows outcomes for different decision combinations." },
    // Hard (5)
    { id: 131, q: "What is the garbage can model of decision making?", opts: ["A systematic model","Random process where decisions are solutions looking for problems","A data model","A planning model"], ans: 1, diff: "hard", explanation: "Garbage can model recognizes decisions as chaotic and unpredictable." },
    { id: 132, q: "What is political model of decision making?", opts: ["Based on rationality","Based on power and negotiation","Based on data","Based on mathematics"], ans: 1, diff: "hard", explanation: "Political model involves bargaining among stakeholders with different interests." },
    { id: 133, q: "What is incremental decision making?", opts: ["Big revolutionary changes","Small sequential changes","Random decisions","All decisions at once"], ans: 1, diff: "hard", explanation: "Incrementalism makes small adjustments rather than comprehensive changes." },
    { id: 134, q: "What is the Vroom-Yetton-Jago decision model?", opts: ["A voting model","Contingency model for leader decision participation","A financial model","A scheduling model"], ans: 1, diff: "hard", explanation: "VYJ model helps leaders determine appropriate participation levels." },
    { id: 135, q: "What is cognitive bias in decisions?", opts: ["Mathematical error","Systematic thinking error affecting decisions","Data corruption","Software bug"], ans: 1, diff: "hard", explanation: "Cognitive biases are systematic deviations from rational decision-making." },
  ],
"Python Basics": [
    { id: 10, q: "Which of these is a mutable data type in Python?", opts: ["Tuple","String","List","Integer"], ans: 2, diff: "easy", explanation: "Lists are mutable — you can add, remove, or change elements after creation." },
    { id: 11, q: "What does the 'self' keyword represent in Python classes?", opts: ["The class itself","The instance of the class","A static method","None"], ans: 1, diff: "easy", explanation: "self refers to the specific object instance calling the method." },
    { id: 12, q: "How do you create a dictionary in Python?", opts: ["[]","()","{}","<>"], ans: 2, diff: "easy", explanation: "Curly braces {} with key:value pairs create a dictionary." },
    { id: 13, q: "Which operator is used for floor division in Python?", opts: ["/","//","%","**"], ans: 1, diff: "easy", explanation: "// performs integer (floor) division." },
    { id: 14, q: "Which method adds an element to the end of a list?", opts: ["add()","insert()","append()","push()"], ans: 2, diff: "easy", explanation: "list.append(item) adds item to the end of the list." },
    { id: 15, q: "What is list comprehension?", opts: ["[for x in range(5)]","[x for x in range(5)]","(x for x in range(5))","x for x in range(5)"], ans: 1, diff: "medium", explanation: "[expr for item in iterable] creates a new list concisely." },
  ],
  "HTML Basics": [
    { id: 100, q: "What does HTML stand for?", opts: ["HyperText Markup Language","HighText Machine Language","HyperText Machine Language","HyperType Markup Language"], ans: 0, diff: "easy", explanation: "HTML = HyperText Markup Language." },
    { id: 101, q: "Which tag creates a hyperlink?", opts: ["<link>","<a>","<href>","<url>"], ans: 1, diff: "easy", explanation: "<a href='url'> creates a hyperlink." },
    { id: 102, q: "Which element represents the highest level heading?", opts: ["<h6>","<h1>","<header>","<heading>"], ans: 1, diff: "easy", explanation: "<h1> is the highest level heading." },
    { id: 103, q: "What does the 'alt' attribute on <img> provide?", opts: ["Image title","SEO keywords","Alternative text for accessibility","Image size"], ans: 2, diff: "easy", explanation: "alt text is read by screen readers and shown when image fails to load." },
    { id: 104, q: "Which HTML5 element defines navigation links?", opts: ["<menu>","<nav>","<links>","<navigation>"], ans: 1, diff: "easy", explanation: "<nav> is a semantic element for navigation links." },
  ],
  "CSS Basics": [
    { id: 200, q: "What does CSS stand for?", opts: ["Computer Style Sheets","Cascading Style Sheets","Creative Style Syntax","Coded Style Script"], ans: 1, diff: "easy", explanation: "CSS = Cascading Style Sheets." },
    { id: 201, q: "Which CSS property changes text color?", opts: ["font-color","text-color","color","foreground"], ans: 2, diff: "easy", explanation: "The color property sets the foreground color of text." },
    { id: 202, q: "What is the CSS box model (outside to inside)?", opts: ["Content → Padding → Border → Margin","Margin → Border → Padding → Content","Border → Padding → Margin → Content","Content → Border → Padding → Margin"], ans: 1, diff: "medium", explanation: "Box model from outside in: Margin → Border → Padding → Content." },
    { id: 203, q: "Which display value makes a flex container?", opts: ["block","inline","flex","grid"], ans: 2, diff: "easy", explanation: "display: flex activates Flexbox layout." },
    { id: 204, q: "What does z-index control?", opts: ["Horizontal position","Vertical position","Stacking order on the z-axis","Transparency"], ans: 2, diff: "easy", explanation: "z-index controls which element appears in front when elements overlap." },
  ],
  "JavaScript Basics": [
    { id: 300, q: "Which keyword declares a block-scoped variable?", opts: ["var","let","const","function"], ans: 1, diff: "easy", explanation: "let declares a block-scoped variable." },
    { id: 301, q: "What does '===' check in JavaScript?", opts: ["Value only","Type only","Value AND type","Reference"], ans: 2, diff: "easy", explanation: "=== is strict equality — checks both value and type." },
    { id: 302, q: "Which method converts JSON string to object?", opts: ["JSON.stringify()","JSON.parse()","JSON.decode()","JSON.convert()"], ans: 1, diff: "easy", explanation: "JSON.parse(str) converts a JSON string into a JS object." },
    { id: 303, q: "What is a Promise in JavaScript?", opts: ["A callback function","An object representing an eventual async value","A synchronous function","A type of loop"], ans: 1, diff: "medium", explanation: "A Promise represents a value that may be available now or in the future." },
    { id: 304, q: "Which array method creates a new array with transformed elements?", opts: ["forEach","filter","map","reduce"], ans: 2, diff: "easy", explanation: "Array.map(fn) applies fn to each element and returns a new array." },
  ],
  "SQL Basics": [
    { id: 691, q: "What symbol selects all columns in SQL?", opts: ["%","#","*","@"], ans: 2, diff: "easy", explanation: "The asterisk (*) is a wildcard that selects every column in the result set." },
    { id: 692, q: "Which clause filters rows based on a condition?", opts: ["HAVING","FROM","WHERE","LIMIT"], ans: 2, diff: "easy", explanation: "WHERE filters individual rows before grouping; HAVING filters groups after GROUP BY." },
    { id: 693, q: "How do you insert a new record into a table?", opts: ["ADD INTO","INSERT INTO","PUT INTO","CREATE INTO"], ans: 1, diff: "easy", explanation: "INSERT INTO tableName (cols) VALUES (vals) is the standard DML syntax." },
    { id: 694, q: "Which command updates existing data?", opts: ["MODIFY","CHANGE","UPDATE","EDIT"], ans: 2, diff: "easy", explanation: "UPDATE table SET col=val WHERE condition modifies existing rows." },
    { id: 695, q: "What does JOIN do in SQL?", opts: ["Deletes rows","Combines rows from multiple tables","Sorts results","Creates a new table"], ans: 1, diff: "easy", explanation: "JOIN merges rows from two or more tables based on a related column." },
    { id: 696, q: "Which JOIN returns all rows from both tables?", opts: ["INNER JOIN","LEFT JOIN","RIGHT JOIN","FULL OUTER JOIN"], ans: 3, diff: "medium", explanation: "FULL OUTER JOIN returns all rows from both tables; unmatched sides get NULLs." },
    { id: 697, q: "What is the purpose of GROUP BY?", opts: ["Sort data","Filter rows","Group rows sharing a value for aggregate functions","Join tables"], ans: 2, diff: "medium", explanation: "GROUP BY collapses rows with the same value into a single group for aggregation." },
    { id: 698, q: "Which aggregate function returns the number of rows?", opts: ["SUM","AVG","COUNT","MAX"], ans: 2, diff: "easy", explanation: "COUNT(*) returns total rows; COUNT(col) excludes NULLs." },
    { id: 699, q: "What does DISTINCT do?", opts: ["Removes duplicates","Sorts ASC","Selects NULL rows","Limits rows"], ans: 0, diff: "easy", explanation: "SELECT DISTINCT eliminates duplicate values from the result set." },
    { id: 700, q: "Which clause filters groups after GROUP BY?", opts: ["WHERE","FILTER","HAVING","LIMIT"], ans: 2, diff: "medium", explanation: "HAVING applies conditions to aggregated groups, unlike WHERE which filters rows." },
    { id: 701, q: "What is a PRIMARY KEY constraint?", opts: ["Allows duplicates","NULL allowed","Uniquely identifies each row, no NULL","Foreign reference"], ans: 2, diff: "easy", explanation: "PRIMARY KEY enforces uniqueness and non-null on the column(s), identifying each row." },
    { id: 702, q: "Which SQL clause sorts the result set?", opts: ["SORT BY","ORDER BY","GROUP BY","ARRANGE BY"], ans: 1, diff: "easy", explanation: "ORDER BY col ASC|DESC sorts the final result set." },
    { id: 703, q: "What does a FOREIGN KEY enforce?", opts: ["Uniqueness","Referential integrity between tables","NOT NULL","Indexing"], ans: 1, diff: "medium", explanation: "A FOREIGN KEY links to a PRIMARY KEY in another table, enforcing referential integrity." },
    { id: 704, q: "Which command removes all rows from a table without logging each deletion?", opts: ["DELETE","DROP","REMOVE","TRUNCATE"], ans: 3, diff: "medium", explanation: "TRUNCATE removes all rows quickly; DELETE logs each row and can be rolled back." },
  ],

  "Python Basics": [
    { id: 10, q: "Which of these is a mutable data type in Python?", opts: ["Tuple","String","List","Integer"], ans: 2, diff: "easy", explanation: "Lists are mutable — you can add, remove, or change elements after creation." },
    { id: 11, q: "What does the 'self' keyword represent in Python classes?", opts: ["The class itself","The instance of the class","A static method","None"], ans: 1, diff: "easy", explanation: "self refers to the specific object instance calling the method." },
    { id: 12, q: "What is the output of list(range(2, 10, 3))?", opts: ["[2,5,8]","[2,3,4,5,6,7,8,9]","[2,4,6,8]","[3,6,9]"], ans: 0, diff: "medium", explanation: "range(2,10,3) starts at 2, steps by 3: 2, 5, 8 (next would be 11 which exceeds 10)." },
    { id: 13, q: "Which Python keyword defines a generator?", opts: ["return","yield","generate","async"], ans: 1, diff: "hard", explanation: "yield pauses the function and returns a value lazily; calling next() resumes it." },
    { id: 14, q: "How do you create a dictionary in Python?", opts: ["[]","()","{}","<>"], ans: 2, diff: "easy", explanation: "Curly braces {} with key:value pairs create a dictionary; {} alone creates an empty dict." },
    { id: 15, q: "What does len() return for the string 'hello'?", opts: ["4","5","6","'hello'"], ans: 1, diff: "easy", explanation: "len() counts characters: h-e-l-l-o = 5." },
    { id: 16, q: "Which operator is used for floor division in Python?", opts: ["/","//","%","**"], ans: 1, diff: "easy", explanation: "// performs integer (floor) division, discarding the decimal part." },
    { id: 17, q: "What is a lambda function?", opts: ["A named function","An anonymous single-expression function","A class method","A coroutine"], ans: 1, diff: "medium", explanation: "lambda args: expr creates small anonymous functions inline." },
    { id: 18, q: "Which method adds an element to the end of a list?", opts: ["add()","insert()","append()","push()"], ans: 2, diff: "easy", explanation: "list.append(item) adds item to the end of the list in O(1) amortized time." },
    { id: 19, q: "What does the 'pass' statement do?", opts: ["Exits loop","Returns None","Does nothing; placeholder","Skips next line"], ans: 2, diff: "easy", explanation: "pass is a no-op placeholder used where a statement is syntactically required." },
    { id: 20, q: "What is list comprehension syntax in Python?", opts: ["[for x in range(5)]","[x for x in range(5)]","(x for x in range(5))","x for x in range(5)"], ans: 1, diff: "medium", explanation: "[expr for item in iterable] creates a new list concisely." },
    { id: 21, q: "Which Python data type is an ordered, immutable sequence?", opts: ["List","Set","Tuple","Dictionary"], ans: 2, diff: "easy", explanation: "Tuples are ordered and immutable; you cannot change their elements after creation." },
    { id: 22, q: "What does 'import os' allow you to do?", opts: ["Math operations","Interact with the operating system","Database access","HTTP requests"], ans: 1, diff: "easy", explanation: "The os module provides functions for interacting with the OS (files, paths, env vars)." },
    { id: 23, q: "What is the output of bool(0)?", opts: ["True","False","0","None"], ans: 1, diff: "easy", explanation: "In Python, 0, empty strings, empty containers, and None are all falsy." },
    { id: 24, q: "Which exception is raised for division by zero?", opts: ["ValueError","TypeError","ZeroDivisionError","ArithmeticError"], ans: 2, diff: "easy", explanation: "ZeroDivisionError is raised when dividing or modding by zero." },
  ],

  "HTML Basics": [
    { id: 100, q: "What does HTML stand for?", opts: ["HyperText Markup Language","HighText Machine Language","HyperText Machine Language","HyperType Markup Language"], ans: 0, diff: "easy", explanation: "HTML = HyperText Markup Language — the standard language for creating web pages." },
    { id: 101, q: "Which HTML5 element draws graphics via JavaScript?", opts: ["<svg>","<canvas>","<img>","<figure>"], ans: 1, diff: "easy", explanation: "<canvas> provides a bitmap drawing surface; <svg> is vector-based XML." },
    { id: 102, q: "Which input type validates an email in HTML5?", opts: ["type=text","type=email","type=mail","type=validate"], ans: 1, diff: "easy", explanation: "type='email' provides built-in email format validation in HTML5." },
    { id: 103, q: "What does the 'contenteditable' attribute do?", opts: ["Enables CSS editing","Lets user edit element content","Injects JavaScript","None"], ans: 1, diff: "medium", explanation: "contenteditable='true' makes any HTML element directly editable by the user." },
    { id: 104, q: "Which tag creates a hyperlink?", opts: ["<link>","<a>","<href>","<url>"], ans: 1, diff: "easy", explanation: "<a href='url'> creates a hyperlink; href specifies the destination." },
    { id: 105, q: "Which element represents the highest level heading?", opts: ["<h6>","<h1>","<header>","<heading>"], ans: 1, diff: "easy", explanation: "<h1> is the highest/most important heading; <h6> is the lowest." },
    { id: 106, q: "What is the purpose of the <meta charset='UTF-8'> tag?", opts: ["Sets page title","Links CSS file","Declares character encoding","Creates a viewport"], ans: 2, diff: "medium", explanation: "charset='UTF-8' tells the browser how to decode the HTML file's bytes into characters." },
    { id: 107, q: "Which HTML tag is used for an unordered list?", opts: ["<ol>","<ul>","<li>","<list>"], ans: 1, diff: "easy", explanation: "<ul> creates a bulleted unordered list; <ol> creates a numbered ordered list." },
    { id: 108, q: "What does the 'alt' attribute on <img> provide?", opts: ["Image title","SEO keywords","Alternative text for accessibility","Image size"], ans: 2, diff: "easy", explanation: "alt text is read by screen readers and shown when the image fails to load." },
    { id: 109, q: "Which HTML5 element defines navigation links?", opts: ["<menu>","<nav>","<links>","<navigation>"], ans: 1, diff: "easy", explanation: "<nav> is a semantic element that identifies a section of navigation links." },
  ],

  "CSS Basics": [
    { id: 200, q: "What does CSS stand for?", opts: ["Computer Style Sheets","Cascading Style Sheets","Creative Style Syntax","Coded Style Script"], ans: 1, diff: "easy", explanation: "CSS = Cascading Style Sheets — it describes how HTML elements are displayed." },
    { id: 201, q: "Which CSS property changes text color?", opts: ["font-color","text-color","color","foreground"], ans: 2, diff: "easy", explanation: "The color property sets the foreground color of text content." },
    { id: 202, q: "What is the CSS box model (outside to inside)?", opts: ["Content → Padding → Border → Margin","Margin → Border → Padding → Content","Border → Padding → Margin → Content","Content → Border → Padding → Margin"], ans: 1, diff: "medium", explanation: "Box model from outside in: Margin → Border → Padding → Content." },
    { id: 203, q: "Which value of display makes an element a flex container?", opts: ["block","inline","flex","grid"], ans: 2, diff: "easy", explanation: "display: flex activates Flexbox layout on the container's direct children." },
    { id: 204, q: "What does z-index control?", opts: ["Horizontal position","Vertical position","Stacking order on the z-axis","Transparency"], ans: 2, diff: "easy", explanation: "z-index controls which element appears in front when elements overlap." },
    { id: 205, q: "Which selector has the highest specificity?", opts: ["Element selector","Class selector","ID selector","Inline style"], ans: 3, diff: "medium", explanation: "Inline styles have specificity 1-0-0-0, overriding IDs (0-1-0-0) and classes (0-0-1-0)." },
    { id: 206, q: "What does 'position: absolute' do?", opts: ["Stays in normal flow","Positioned relative to nearest positioned ancestor","Fixes to viewport","Sticks on scroll"], ans: 1, diff: "medium", explanation: "Absolute positioning removes the element from normal flow and places it relative to the nearest positioned (non-static) ancestor." },
    { id: 207, q: "Which CSS property adds space inside an element's border?", opts: ["margin","spacing","padding","border-space"], ans: 2, diff: "easy", explanation: "padding adds space between the content and the border; margin adds space outside the border." },
    { id: 208, q: "What is a CSS media query used for?", opts: ["Fetch data","Apply styles based on device/screen conditions","Animate elements","Store variables"], ans: 1, diff: "easy", explanation: "@media queries apply CSS conditionally based on screen width, orientation, etc." },
    { id: 209, q: "Which CSS property makes text bold?", opts: ["text-weight","font-weight: bold","text-style: bold","bold: true"], ans: 1, diff: "easy", explanation: "font-weight: bold (or 700) renders text in bold weight." },
  ],

  "JavaScript Basics": [
    { id: 300, q: "Which keyword declares a block-scoped variable?", opts: ["var","let","const","function"], ans: 1, diff: "easy", explanation: "let declares a block-scoped variable that can be reassigned; const is block-scoped but immutable binding." },
    { id: 301, q: "What does '===' check in JavaScript?", opts: ["Value only","Type only","Value AND type","Reference"], ans: 2, diff: "easy", explanation: "=== is strict equality — it checks both value and type, unlike == which coerces types." },
    { id: 302, q: "Which method converts JSON string to a JavaScript object?", opts: ["JSON.stringify()","JSON.parse()","JSON.decode()","JSON.convert()"], ans: 1, diff: "easy", explanation: "JSON.parse(str) converts a JSON string into a JS object; JSON.stringify() does the reverse." },
    { id: 303, q: "What is a Promise in JavaScript?", opts: ["A callback function","An object representing an eventual async value","A synchronous function","A type of loop"], ans: 1, diff: "medium", explanation: "A Promise represents a value that may be available now, in the future, or never." },
    { id: 304, q: "Which array method creates a new array with transformed elements?", opts: ["forEach","filter","map","reduce"], ans: 2, diff: "easy", explanation: "Array.map(fn) applies fn to each element and returns a new transformed array." },
    { id: 305, q: "What does 'typeof null' return?", opts: ["'null'","'undefined'","'object'","'boolean'"], ans: 2, diff: "hard", explanation: "typeof null returns 'object' — this is a well-known historical bug in JavaScript." },
    { id: 306, q: "Which keyword is used to handle async/await errors?", opts: ["catch","try/catch","error()","handleError"], ans: 1, diff: "medium", explanation: "try/catch blocks handle errors in async/await code, catching rejected promises." },
    { id: 307, q: "What does the spread operator '...' do?", opts: ["Multiplies arrays","Expands iterable into individual elements","Creates deep copy only","Joins strings"], ans: 1, diff: "medium", explanation: "The spread operator expands arrays/objects: [...arr] clones, [...a,...b] merges." },
    { id: 308, q: "Which event fires when the DOM is fully loaded?", opts: ["onload","DOMContentLoaded","ready","init"], ans: 1, diff: "medium", explanation: "DOMContentLoaded fires when HTML is parsed; 'load' fires after all resources (images, etc.) load." },
    { id: 309, q: "What is closure in JavaScript?", opts: ["A stopped function","A function with access to its outer scope even after the outer function returns","An error handler","A module pattern"], ans: 1, diff: "hard", explanation: "Closures allow inner functions to remember variables from the enclosing scope even after it has returned." },
  ],

"React Basics": [
    // Easy (5)
    { id: 400, q: "What is JSX?", opts: ["A JavaScript library","A syntax extension allowing HTML-like code in JavaScript","A CSS framework","A database query language"], ans: 1, diff: "easy", explanation: "JSX (JavaScript XML) is syntactic sugar compiled by Babel into React.createElement() calls." },
    { id: 401, q: "Which hook manages state in a functional component?", opts: ["useEffect","useRef","useState","useContext"], ans: 2, diff: "easy", explanation: "useState returns [state, setter] and re-renders the component when state changes." },
    { id: 404, q: "Which direction does data flow in React?", opts: ["Child to parent","Sibling to sibling","Parent to child (unidirectional)","Bidirectional"], ans: 2, diff: "easy", explanation: "React follows one-way (unidirectional) data flow — props pass from parent to child." },
    { id: 420, q: "What is a React component?", opts: ["A database","A reusable piece of UI","A CSS file","A server"], ans: 1, diff: "easy", explanation: "Components are reusable UI pieces that can be functions or classes." },
    { id: 421, q: "What is the purpose of props in React?", opts: ["Styling components","Passing data from parent to child","Managing state","Routing"], ans: 1, diff: "easy", explanation: "Props (properties) pass data and functions from parent components to children." },
    // Medium (5)
    { id: 402, q: "What does useEffect with an empty array dependency do?", opts: ["Runs on every render","Runs only once after mount","Runs on unmount","Never runs"], ans: 1, diff: "medium", explanation: "useEffect(() => {}, []) runs the effect only after the first render, like componentDidMount." },
    { id: 403, q: "What is a React key prop used for?", opts: ["Styling","Authentication","Helping React identify which list items changed","Passing data to children"], ans: 2, diff: "medium", explanation: "Keys help React's diffing algorithm identify changed, added, or removed list items efficiently." },
    { id: 405, q: "What is the virtual DOM?", opts: ["A browser feature","A lightweight in-memory copy of the real DOM for efficient diffing","A React library","A CSS preprocessor"], ans: 1, diff: "medium", explanation: "React maintains a virtual DOM and diffs it against the real DOM to minimize expensive DOM operations." },
    { id: 406, q: "Which hook runs a callback when a value changes?", opts: ["useState","useCallback","useEffect","useMemo"], ans: 2, diff: "medium", explanation: "useEffect(fn, [dep]) runs fn whenever dep changes, handling side effects." },
    { id: 408, q: "What is prop drilling?", opts: ["Drilling into DOM nodes","Passing props through many layers of components unnecessarily","A performance optimization","A routing pattern"], ans: 1, diff: "medium", explanation: "Prop drilling occurs when you pass props through intermediate components that don't use them." },
    // Hard (5)
    { id: 407, q: "What does React.memo do?", opts: ["Creates a memo pad","Memoizes a component to prevent unnecessary re-renders","Caches API calls","Manages state"], ans: 1, diff: "hard", explanation: "React.memo wraps a component and skips re-rendering if props haven't changed (shallow comparison)." },
    { id: 409, q: "Which hook provides access to a mutable ref object?", opts: ["useState","useCallback","useMemo","useRef"], ans: 3, diff: "medium", explanation: "useRef returns a mutable .current object that persists for the full lifetime of the component." },
    { id: 422, q: "What is useContext used for?", opts: ["HTTP requests","Accessing global state without props","Database calls","Routing"], ans: 1, diff: "hard", explanation: "useContext allows components to access global state passed from a provider." },
    { id: 423, q: "What is the purpose of useCallback?", opts: ["Making API calls","Memoizing functions to prevent unnecessary recreations","Fetching data","Managing refs"], ans: 1, diff: "hard", explanation: "useCallback memoizes functions, returning the same reference unless dependencies change." },
    { id: 424, q: "What is a controlled component in React?", opts: ["A component with no state","A component where form data is handled by React state","A component using refs only","An unmounted component"], ans: 1, diff: "hard", explanation: "Controlled components have their form data handled by React state through event handlers." },
  ],

"C Basics": [
    // Easy (5)
    { id: 820, q: "The entry point of every C program is:", opts: ["start()","begin()","main()","run()"], ans: 2, diff: "easy", explanation: "C programs always begin execution from the main() function." },
    { id: 821, q: "Which symbol ends a C statement?", opts: [".",":",";",","], ans: 2, diff: "easy", explanation: "A semicolon (;) terminates statements in C, unlike Python which uses newlines." },
    { id: 822, q: "C is a _____ level language.", opts: ["High","Low","Middle","Machine"], ans: 2, diff: "easy", explanation: "C is a middle-level language — it combines high-level constructs with low-level memory access." },
    { id: 823, q: "Which data type stores a decimal number in C?", opts: ["int","char","float","bool"], ans: 2, diff: "easy", explanation: "float stores single-precision floating-point numbers; double is double-precision." },
    { id: 824, q: "Which header is required for printf() in C?", opts: ["stdlib.h","stdio.h","string.h","math.h"], ans: 1, diff: "easy", explanation: "<stdio.h> (Standard Input/Output) provides printf, scanf, FILE, and other I/O functions." },
    // Medium (5)
    { id: 825, q: "What is a pointer in C?", opts: ["A variable storing a value","A variable storing a memory address","A data structure","A function parameter"], ans: 1, diff: "easy", explanation: "A pointer stores the memory address of another variable: int *ptr = &x;" },
    { id: 826, q: "What does malloc() return?", opts: ["int","void pointer to allocated memory","char","NULL always"], ans: 1, diff: "medium", explanation: "malloc(n) allocates n bytes and returns a void* pointer; returns NULL on failure." },
    { id: 827, q: "What is the dereference operator?", opts: ["&","*","->","."], ans: 1, diff: "easy", explanation: "* dereferences a pointer to access the value at that memory address." },
    { id: 828, q: "What does 'sizeof' return?", opts: ["Value of variable","Number of elements","Size in bytes","Memory address"], ans: 2, diff: "easy", explanation: "sizeof(type) returns the size in bytes of the type or variable on the current platform." },
    { id: 829, q: "Which loop guarantees at least one execution?", opts: ["for","while","do-while","foreach"], ans: 2, diff: "easy", explanation: "do-while checks the condition after executing the body, guaranteeing one execution." },
    // Hard (5)
    { id: 830, q: "What is a struct in C?", opts: ["A function","A user-defined data type grouping related variables","A pointer","A macro"], ans: 1, diff: "hard", explanation: "Structs group variables of different types together." },
    { id: 831, q: "What is the difference between malloc() and calloc()?", opts: ["No difference","malloc doesn't initialize; calloc initializes to zero","calloc is faster","malloc is older"], ans: 1, diff: "hard", explanation: "malloc allocates uninitialized memory; calloc zero-initializes allocated memory." },
    { id: 832, q: "What is a NULL pointer?", opts: ["Points to memory location 0","Contains garbage","Already freed","A special type"], ans: 0, diff: "hard", explanation: "NULL is a constant representing a pointer that doesn't point to valid memory." },
    { id: 833, q: "What is the purpose of the 'const' keyword in C?", opts: ["Defines a constant","Creates a variable","Allocates memory","Declares a function"], ans: 0, diff: "hard", explanation: "const makes a variable's value unchangeable after initialization." },
    { id: 834, q: "What is recursion in C?", opts: ["A loop","A function calling itself","A type of array","A pointer operation"], ans: 1, diff: "hard", explanation: "Recursion is when a function calls itself to solve smaller instances of a problem." },
  ],

  "C++ Basics": [
    { id: 920, q: "C++ is an extension of which language?", opts: ["Java","Python","C","Pascal"], ans: 2, diff: "easy", explanation: "C++ was developed by Bjarne Stroustrup as an extension of C with OOP features." },
    { id: 921, q: "Which header provides cin and cout in C++?", opts: ["<stdio.h>","<iostream>","<conio.h>","<stream>"], ans: 1, diff: "easy", explanation: "<iostream> provides the standard input/output stream objects cin and cout." },
    { id: 922, q: "How do you print to console in C++?", opts: ["print()","System.out.println()","cout <<","printf() only"], ans: 2, diff: "easy", explanation: "cout << 'text' << endl; uses the insertion operator to send output to stdout." },
    { id: 923, q: "What does std::endl do?", opts: ["End program","New line and flush buffer","Error output","End of file"], ans: 1, diff: "easy", explanation: "endl inserts a newline character AND flushes the output buffer (slower than '\\n')." },
    { id: 924, q: "Which operator allocates heap memory in C++?", opts: ["malloc()","new","alloc()","create"], ans: 1, diff: "easy", explanation: "new allocates heap memory and calls the constructor; delete frees it." },
    { id: 925, q: "What is a constructor?", opts: ["A function that destroys an object","A function called automatically on object creation","A static function","A friend function"], ans: 1, diff: "easy", explanation: "A constructor has the same name as the class, no return type, and is called on object instantiation." },
    { id: 926, q: "What is polymorphism?", opts: ["Same code, same behavior","Different classes responding to the same interface differently","Multiple inheritance","Template programming"], ans: 1, diff: "medium", explanation: "Polymorphism lets objects of different types be treated through the same interface, responding differently." },
    { id: 927, q: "What does 'virtual' keyword enable?", opts: ["Multiple inheritance","Runtime (dynamic) polymorphism via vtable","Template specialization","Operator overloading"], ans: 1, diff: "medium", explanation: "virtual functions enable runtime polymorphism — the correct derived class method is called via vtable." },
    { id: 928, q: "What is the STL?", opts: ["Simple Template Library","Standard Template Library of containers and algorithms","System Tools Library","Static Type Language"], ans: 1, diff: "easy", explanation: "STL provides reusable containers (vector, map), algorithms (sort, find), and iterators." },
    { id: 929, q: "What is a destructor?", opts: ["A constructor variant","Called automatically when object goes out of scope to free resources","A delete function","A copy constructor"], ans: 1, diff: "medium", explanation: "Destructors (~ClassName()) clean up resources (memory, file handles) when an object is destroyed." },
  ],

  "Java Basics": [
    { id: 1000, q: "Java programs run on the:", opts: ["CPU directly","Operating System","JVM (Java Virtual Machine)","Browser only"], ans: 2, diff: "easy", explanation: "Java bytecode runs on the JVM, making it platform-independent ('Write Once, Run Anywhere')." },
    { id: 1001, q: "Which keyword creates a class instance in Java?", opts: ["create","make","new","allocate"], ans: 2, diff: "easy", explanation: "new ClassName() allocates heap memory and calls the constructor." },
    { id: 1002, q: "What is the default value of an int in Java?", opts: ["null","undefined","0","1"], ans: 2, diff: "easy", explanation: "Instance variables of primitive types are initialized to 0 (int), false (boolean), etc." },
    { id: 1003, q: "Which access modifier makes a member accessible only within its class?", opts: ["public","protected","default","private"], ans: 3, diff: "easy", explanation: "private restricts access to only the declaring class — highest encapsulation." },
    { id: 1004, q: "What does 'final' mean on a variable?", opts: ["Constant — cannot be reassigned","Static","Thread-safe","Immutable object"], ans: 0, diff: "easy", explanation: "final on a variable makes the binding immutable (the reference, not necessarily the object content)." },
    { id: 1005, q: "Which Java collection maintains insertion order with duplicates?", opts: ["HashSet","TreeSet","ArrayList","HashMap"], ans: 2, diff: "medium", explanation: "ArrayList is an ordered, resizable array that allows duplicate elements." },
    { id: 1006, q: "What is method overloading?", opts: ["Same method name, different signatures","Overriding a parent method","Hiding a method","Multiple return types"], ans: 0, diff: "medium", explanation: "Overloading = same method name but different parameter types/count in the same class." },
    { id: 1007, q: "Which exception is thrown when accessing a null reference?", opts: ["NullException","NullReferenceException","NullPointerException","IllegalArgumentException"], ans: 2, diff: "easy", explanation: "NullPointerException is thrown when you call a method or access a field on a null reference." },
    { id: 1008, q: "What is an interface in Java?", opts: ["A class with fields","A contract defining method signatures without implementations","An abstract class","A final class"], ans: 1, diff: "medium", explanation: "Interfaces define a contract of abstract methods (and default methods since Java 8) that implementing classes must fulfil." },
    { id: 1009, q: "Which keyword is used to inherit a class in Java?", opts: ["implements","inherits","extends","super"], ans: 2, diff: "easy", explanation: "extends establishes inheritance: class Child extends Parent." },
  ],

  "Data Wrangling & EDA": [
    { id: 1100, q: "Which pandas method shows the first 5 rows of a DataFrame?", opts: ["df.tail()","df.head()","df.show()","df.top()"], ans: 1, diff: "easy", explanation: "df.head(n) returns the first n rows (default 5); tail() returns the last n." },
    { id: 1101, q: "What does df.isnull().sum() return?", opts: ["Total rows","Count of null values per column","Mean of nulls","Shape of dataframe"], ans: 1, diff: "easy", explanation: "isnull() returns a boolean mask; .sum() aggregates True=1 to count nulls per column." },
    { id: 1102, q: "Which method fills missing values?", opts: ["df.dropna()","df.fillna()","df.replace()","df.impute()"], ans: 1, diff: "easy", explanation: "fillna(value) replaces NaN/None with the specified value or strategy." },
    { id: 1103, q: "What does df.describe() show?", opts: ["Column types","Summary statistics (count, mean, std, min, max, quartiles)","Null counts","Index info"], ans: 1, diff: "easy", explanation: "describe() gives count, mean, std, min, 25%, 50%, 75%, max for numeric columns." },
    { id: 1104, q: "Which NumPy function creates an array of zeros?", opts: ["np.empty()","np.ones()","np.zeros()","np.full()"], ans: 2, diff: "easy", explanation: "np.zeros(shape) creates an ndarray filled with 0.0 values." },
    { id: 1105, q: "What is a pandas Series?", opts: ["2D labeled array","1D labeled array","3D tensor","A SQL table"], ans: 1, diff: "easy", explanation: "A Series is a 1D labeled array that can hold any data type, with an index." },
    { id: 1106, q: "Which pandas function merges two DataFrames like a SQL join?", opts: ["df.append()","pd.concat()","pd.merge()","df.join()"], ans: 2, diff: "medium", explanation: "pd.merge(df1, df2, on='key') performs SQL-style joins between DataFrames." },
    { id: 1107, q: "What does df.groupby('col').mean() do?", opts: ["Sort by col","Filter rows","Group rows by col and compute mean per group","Count unique values"], ans: 2, diff: "medium", explanation: "groupby splits data by column values, then applies aggregation (mean, sum, count) to each group." },
    { id: 1108, q: "Which Matplotlib function creates a line plot?", opts: ["plt.bar()","plt.scatter()","plt.plot()","plt.hist()"], ans: 2, diff: "easy", explanation: "plt.plot(x, y) draws a line chart connecting data points." },
    { id: 1109, q: "What does df.shape return?", opts: ["Column names","Data types","Tuple of (rows, columns)","Memory usage"], ans: 2, diff: "easy", explanation: "shape returns a tuple (num_rows, num_cols) describing the DataFrame dimensions." },
  ],

  "Machine Learning Fundamentals": [
    { id: 1200, q: "What is supervised learning?", opts: ["Learning without labels","Learning from labeled input-output pairs","Learning by reward","Clustering unlabeled data"], ans: 1, diff: "easy", explanation: "Supervised learning trains on labeled examples where the correct output is known." },
    { id: 1201, q: "What is overfitting?", opts: ["Model too simple","Model performs well on training but poorly on new data","Underfitting","Early stopping"], ans: 1, diff: "easy", explanation: "Overfitting means the model memorized training data, including noise, and fails to generalize." },
    { id: 1202, q: "Which metric measures classification accuracy?", opts: ["MSE","R-squared","RMSE","F1-Score"], ans: 3, diff: "medium", explanation: "F1-Score is the harmonic mean of precision and recall, useful for imbalanced classes." },
    { id: 1203, q: "What does gradient descent minimize?", opts: ["Dataset size","Model complexity","Loss function","Feature count"], ans: 2, diff: "medium", explanation: "Gradient descent iteratively adjusts parameters in the negative gradient direction to minimize the loss." },
    { id: 1204, q: "What is cross-validation used for?", opts: ["Training faster","Estimating model performance on unseen data","Feature selection","Data augmentation"], ans: 1, diff: "medium", explanation: "k-fold cross-validation evaluates generalization by training/testing on different data subsets." },
    { id: 1205, q: "What is a decision tree's key operation?", opts: ["Backpropagation","Splitting data on features to maximize information gain","Gradient calculation","Distance computation"], ans: 1, diff: "medium", explanation: "Decision trees recursively split on the best feature to maximize information gain or minimize Gini impurity." },
    { id: 1206, q: "What is regularization?", opts: ["Data cleaning","Adding noise to input","Adding a penalty to the loss to reduce overfitting","Normalizing features"], ans: 2, diff: "medium", explanation: "L1 (Lasso) and L2 (Ridge) regularization add weight penalty terms to discourage complex models." },
    { id: 1207, q: "Which algorithm is used for classification AND regression?", opts: ["K-Means","DBSCAN","Random Forest","PCA"], ans: 2, diff: "medium", explanation: "Random Forest (ensemble of decision trees) handles both classification and regression tasks." },
    { id: 1208, q: "What is the bias-variance tradeoff?", opts: ["Speed vs accuracy","Error from wrong assumptions vs sensitivity to training data fluctuations","Precision vs recall","Training vs test loss"], ans: 1, diff: "hard", explanation: "High bias = underfitting; high variance = overfitting. The goal is to minimize total error." },
    { id: 1209, q: "What does PCA do?", opts: ["Classification","Reduces dimensionality by finding orthogonal principal components","Clustering","Outlier detection"], ans: 1, diff: "medium", explanation: "PCA projects data onto fewer dimensions capturing maximum variance, reducing noise and complexity." },
  ],

"DBMS": [
    // Easy (5)
    { id: 1300, q: "What does DBMS stand for?", opts: ["Data Business Management System","Database Management System","Data Backup Management Software","Digital Base Management System"], ans: 1, diff: "easy", explanation: "DBMS = Database Management System — software that manages databases." },
    { id: 1301, q: "What is an ER diagram?", opts: ["Error Report","Entity-Relationship diagram showing data model","Execution Report","Encrypted Record"], ans: 1, diff: "easy", explanation: "ER diagrams visually represent entities, their attributes, and relationships in a data model." },
    { id: 1302, q: "What is normalization?", opts: ["Deleting data","Organizing data to reduce redundancy and anomalies","Encrypting data","Indexing tables"], ans: 1, diff: "easy", explanation: "Normalization (1NF, 2NF, 3NF) eliminates redundancy and update/insertion/deletion anomalies." },
    { id: 1307, q: "What is a NoSQL database?", opts: ["A database without tables","A non-relational database using flexible schemas (document, key-value, graph, column)","An outdated SQL version","A read-only database"], ans: 1, diff: "easy", explanation: "NoSQL databases like MongoDB, Redis, and Cassandra use non-tabular models for scalability." },
    { id: 1308, q: "What is a primary key?", opts: ["A duplicate key","A unique identifier for each record","A foreign reference","A composite key"], ans: 1, diff: "easy", explanation: "The primary key uniquely identifies each row in a table and cannot contain NULL values." },
    // Medium (5)
    { id: 1303, q: "What is ACID in databases?", opts: ["A query language","Atomicity, Consistency, Isolation, Durability — transaction properties","Access Control ID","Auto Commit ID"], ans: 1, diff: "medium", explanation: "ACID guarantees reliable transactions: all-or-nothing, correct state, isolated, and permanent." },
    { id: 1304, q: "What is a deadlock?", opts: ["A crashed database","Two or more transactions waiting for each other's locks indefinitely","A slow query","An index failure"], ans: 1, diff: "medium", explanation: "Deadlock: T1 holds lock A, waits for B; T2 holds B, waits for A — circular wait." },
    { id: 1305, q: "What is the difference between DELETE and DROP?", opts: ["No difference","DELETE removes rows; DROP removes the entire table structure","DELETE is faster","DROP only removes data, not schema"], ans: 1, diff: "medium", explanation: "DELETE is DML (removes rows, can be rolled back); DROP is DDL (removes table permanently)." },
    { id: 1306, q: "What is a view in SQL?", opts: ["A backup table","A virtual table based on a SELECT query","A stored procedure","An index"], ans: 1, diff: "medium", explanation: "A VIEW is a saved SELECT query that behaves like a table but stores no data (usually)." },
    { id: 1309, q: "What is a foreign key?", opts: ["A key used for encryption","A column referencing primary key in another table","A unique index","A composite index"], ans: 1, diff: "medium", explanation: "A foreign key creates a relationship between tables by referencing the primary key of another table." },
    // Hard (5)
    { id: 1310, q: "What is a database transaction?", opts: ["A single SQL statement","A sequence of SQL operations treated as a single unit","A backup process","A query optimization"], ans: 1, diff: "hard", explanation: "A transaction is a logical unit of work that either completes fully or not at all." },
    { id: 1311, q: "What is 3NF (Third Normal Form)?", opts: ["No duplicate data","No transitive dependencies, each non-key attribute depends only on the key","All attributes depend on the primary key","Every field is atomic"], ans: 1, diff: "hard", explanation: "3NF requires no transitive dependencies — non-key attributes must depend only on the primary key." },
    { id: 1312, q: "What is database indexing?", opts: ["Data compression","A data structure to speed up data retrieval","Data encryption","Data validation"], ans: 1, diff: "hard", explanation: "Indexes create data structures (typically B-trees) that speed up data retrieval operations." },
    { id: 1313, q: "What is referential integrity?", opts: ["Data encryption","Ensuring foreign key values reference valid primary keys","Data backup","Query optimization"], ans: 1, diff: "hard", explanation: "Referential integrity ensures relationships between tables remain consistent." },
    { id: 1314, q: "What is a stored procedure?", opts: ["A function that returns data","A precompiled set of SQL statements stored in the database","A view","A trigger"], ans: 1, diff: "hard", explanation: "A stored procedure is a precompiled code block that can be executed with a single call." },
  ],

"Operating Systems": [
    // Easy (5)
    { id: 1400, q: "What is a process?", opts: ["A running instance of a program","A stored file","A CPU register","A network packet"], ans: 0, diff: "easy", explanation: "A process is a program in execution, with its own memory space, stack, and resources." },
    { id: 1401, q: "What is a thread?", opts: ["A process copy","A lightweight execution unit sharing the process address space","A file pointer","A network connection"], ans: 1, diff: "easy", explanation: "Threads are lightweight sub-processes sharing memory, enabling concurrent execution within a process." },
    { id: 1403, q: "What is the purpose of a scheduler?", opts: ["Manage files","Allocate CPU time to processes","Handle network packets","Manage RAM"], ans: 1, diff: "easy", explanation: "The CPU scheduler decides which process runs next and for how long, using algorithms like Round Robin." },
    { id: 1410, q: "What is deadlock in operating systems?", opts: ["A process that crashes","Two or more processes unable to proceed waiting for each other","A memory error","A CPU overload"], ans: 1, diff: "easy", explanation: "Deadlock occurs when processes wait for resources held by each other indefinitely." },
    { id: 1411, q: "What is a kernel?", opts: ["The outer shell of an OS","The core of the operating system managing resources","A type of virus","A user interface"], ans: 1, diff: "easy", explanation: "The kernel is the core component of an OS that manages system resources." },
    // Medium (5)
    { id: 1402, q: "What is virtual memory?", opts: ["RAM extension via cache","An abstraction using disk space to extend the apparent size of RAM","A type of GPU memory","A network buffer"], ans: 1, diff: "medium", explanation: "Virtual memory uses disk (swap) to provide each process an illusion of a large, private address space." },
    { id: 1404, q: "What is a semaphore?", opts: ["A CPU register","A synchronization primitive controlling access to shared resources","A file system type","A network protocol"], ans: 1, diff: "medium", explanation: "Semaphores are integer counters used to signal and wait — P() decrements, V() increments." },
    { id: 1405, q: "What is paging?", opts: ["Writing to disk","Dividing memory into fixed-size frames (physical) and pages (logical)","Swapping entire processes","File allocation"], ans: 1, diff: "medium", explanation: "Paging maps logical pages to physical frames, eliminating external fragmentation." },
    { id: 1412, q: "What is context switching?", opts: ["Changing user accounts","Saving and restoring CPU state when switching between processes","Logging out","Switching networks"], ans: 1, diff: "medium", explanation: "Context switching saves the state of one process and restores another to the CPU." },
    { id: 1413, q: "What is a critical section?", opts: ["A section of memory","A code segment accessing shared resources","A system file","A device driver"], ans: 1, diff: "medium", explanation: "A critical section is code that accesses shared resources and must be executed atomically." },
    // Hard (5)
    { id: 1414, q: "What is the difference between preemptive and non-preemptive scheduling?", opts: ["No difference","Preemptive allows higher priority processes to interrupt lower ones","Non-preemptive is faster","Preemptive uses less memory"], ans: 1, diff: "hard", explanation: "Preemptive scheduling allows the OS to interrupt running processes for higher priority ones." },
    { id: 1415, q: "What is thrashing?", opts: ["Excessive CPU usage","Excessive paging activity degrading performance","A type of malware","Network congestion"], ans: 1, diff: "hard", explanation: "Thrashing occurs when the system spends more time paging than executing processes." },
    { id: 1416, q: "What is a mutex?", opts: ["A file lock","A synchronization primitive for mutual exclusion","A memory address","A process ID"], ans: 1, diff: "hard", explanation: "A mutex provides mutual exclusion, allowing only one thread to access a resource at a time." },
    { id: 1417, q: "What is the purpose of RAID in OS?", opts: ["Memory expansion","Data redundancy and performance","Process scheduling","User authentication"], ans: 1, diff: "hard", explanation: "RAID (Redundant Array of Independent Disks) provides data redundancy and performance." },
    { id: 1418, q: "What is file system fragmentation?", opts: ["Data corruption","Scattered file parts on disk reducing performance","Memory leaks","Network issues"], ans: 1, diff: "hard", explanation: "Fragmentation occurs when file data is scattered, causing slower disk access times." },
  ],

"Cloud Computing": [
    // Easy (5)
    { id: 1500, q: "What does IaaS stand for?", opts: ["Internet as a Service","Infrastructure as a Service","Integration as a Service","Instance as a Service"], ans: 1, diff: "easy", explanation: "IaaS provides virtualized computing resources (VMs, storage, networking) over the internet." },
    { id: 1502, q: "What is auto-scaling?", opts: ["Manually adding servers","Automatically adjusting resources based on demand","A backup strategy","A CDN feature"], ans: 1, diff: "easy", explanation: "Auto-scaling automatically adds or removes compute instances based on traffic or CPU metrics." },
    { id: 1504, q: "What is a CDN (Content Delivery Network)?", opts: ["A database","Distributed servers caching content close to users for low latency","A firewall","A VPN"], ans: 1, diff: "easy", explanation: "CDNs cache static assets at edge locations worldwide, reducing latency for global users." },
    { id: 1510, q: "What does PaaS stand for?", opts: ["Platform as a Service","Private as a Service","Public as a Service","Protocol as a Service"], ans: 0, diff: "easy", explanation: "PaaS provides a platform for developers to build applications without managing infrastructure." },
    { id: 1511, q: "What does SaaS stand for?", opts: ["Software as a Service","Storage as a Service","Security as a Service","Server as a Service"], ans: 0, diff: "easy", explanation: "SaaS delivers software applications over the internet on a subscription basis." },
    // Medium (5)
    { id: 1501, q: "What is a container in cloud computing?", opts: ["A VM","A lightweight isolated process environment sharing the host OS kernel","A database","A load balancer"], ans: 1, diff: "medium", explanation: "Containers (Docker) package application + dependencies in an isolated environment, lighter than VMs." },
    { id: 1503, q: "Which AWS service provides serverless function execution?", opts: ["EC2","S3","Lambda","RDS"], ans: 2, diff: "medium", explanation: "AWS Lambda runs code without provisioning servers; you pay per invocation." },
    { id: 1505, q: "What does SLA stand for in cloud services?", opts: ["Server Load Analysis","Service Level Agreement defining uptime guarantees","Secure Login Access","System Latency Average"], ans: 1, diff: "medium", explanation: "SLA is a contract specifying the agreed-upon uptime, performance, and support commitments." },
    { id: 1512, q: "What is cloud virtualization?", opts: ["Hardware emulation","Creating multiple virtual machines on physical hardware","Network security","Data storage"], ans: 1, diff: "medium", explanation: "Virtualization allows multiple virtual machines to run on physical hardware." },
    { id: 1513, q: "What is a load balancer?", opts: ["Data storage","Distributing network traffic across multiple servers","A security tool","A firewall"], ans: 1, diff: "medium", explanation: "Load balancers distribute traffic across multiple servers to ensure no single server is overwhelmed." },
    // Hard (5)
    { id: 1514, q: "What is multi-cloud strategy?", opts: ["Using multiple cloud providers","Using multiple data centers","Backup strategy","Network configuration"], ans: 0, diff: "hard", explanation: "Multi-cloud uses services from multiple cloud providers to avoid vendor lock-in." },
    { id: 1515, q: "What is cloud bursting?", opts: ["Cloud security","Using cloud resources when on-premise capacity is exceeded","Data encryption","Network routing"], ans: 1, diff: "hard", explanation: "Cloud bursting uses cloud resources when on-premise infrastructure cannot handle peak demand." },
    { id: 1516, q: "What is Infrastructure as Code (IaC)?", opts: ["Programming language","Managing infrastructure through code instead of manual processes","Network protocol","Database query"], ans: 1, diff: "hard", explanation: "IaC manages and provisions infrastructure using code and version control." },
    { id: 1517, q: "What is a virtual private cloud (VPC)?", opts: ["A physical network","An isolated cloud environment within a public cloud","A firewall","A database"], ans: 1, diff: "hard", explanation: "VPC provides an isolated virtual network within a cloud provider's infrastructure." },
    { id: 1518, q: "What is serverless computing?", opts: ["No servers needed","Running code without managing servers","Physical servers only","A type of database"], ans: 1, diff: "hard", explanation: "Serverless computing allows developers to run code without provisioning or managing servers." },
  ],

"Deep Learning": [
    // Easy (5)
    { id: 1600, q: "What is a neural network activation function?", opts: ["A loss function","A non-linear function applied to neuron output","A weight initialization","A training algorithm"], ans: 1, diff: "easy", explanation: "Activation functions (ReLU, sigmoid, tanh) introduce non-linearity, enabling complex pattern learning." },
    { id: 1602, q: "What does CNN stand for?", opts: ["Central Neural Network","Convolutional Neural Network","Cyclic Node Network","Cascading Node Network"], ans: 1, diff: "easy", explanation: "CNNs use convolutional layers with learned filters to detect spatial features in images." },
    { id: 1610, q: "What is an RNN?", opts: ["Recursive Neural Network","Recurrent Neural Network","Regression Neural Network","Random Neural Network"], ans: 1, diff: "easy", explanation: "RNNs have connections that loop back, allowing them to process sequential data." },
    { id: 1611, q: "What is the purpose of pooling in CNNs?", opts: ["Increase image size","Reduce spatial dimensions while retaining important features","Add more layers","Initialize weights"], ans: 1, diff: "easy", explanation: "Pooling reduces spatial dimensions, providing translation invariance and reducing computation." },
    { id: 1612, q: "What is gradient descent in deep learning?", opts: ["A network architecture","An optimization algorithm to minimize loss","A type of activation","A regularization technique"], ans: 1, diff: "easy", explanation: "Gradient descent adjusts weights in the direction that reduces the loss function." },
    // Medium (5)
    { id: 1601, q: "What is backpropagation?", opts: ["Forward data pass","Algorithm computing gradients backward through the network to update weights","Dropout technique","Batch normalization"], ans: 1, diff: "medium", explanation: "Backpropagation uses the chain rule to compute gradients of the loss w.r.t. each weight." },
    { id: 1603, q: "What is dropout regularization?", opts: ["Removing entire layers","Randomly deactivating neurons during training to prevent overfitting","Reducing learning rate","Batch normalization"], ans: 1, diff: "medium", explanation: "Dropout randomly zeros neuron outputs with probability p during training, acting as an ensemble." },
    { id: 1604, q: "What is transfer learning?", opts: ["Transferring data between servers","Using a pre-trained model's weights as starting point for a new task","Moving layers between networks","Migrating cloud providers"], ans: 1, diff: "medium", explanation: "Transfer learning reuses weights from models trained on large datasets (e.g., ImageNet) for new tasks." },
    { id: 1605, q: "What is a GAN?", opts: ["General Algorithm Network","Generative Adversarial Network with generator and discriminator","Graph Attention Network","Gated Activation Node"], ans: 1, diff: "medium", explanation: "GANs pit a generator (creates fake data) against a discriminator (detects fakes) in adversarial training." },
    { id: 1613, q: "What is batch normalization?", opts: ["Normalizing input data","Normalizing layer activations","Grouping training data","Reducing batch size"], ans: 1, diff: "medium", explanation: "Batch normalization normalizes activations, helping with training stability and speed." },
    // Hard (5)
    { id: 1614, q: "What is the vanishing gradient problem?", opts: ["Gradients becoming too large","Gradients becoming near-zero during backpropagation","Loss function reaching zero","Weights becoming zero"], ans: 1, diff: "hard", explanation: "Vanishing gradient occurs when gradients become very small, slowing learning in earlier layers." },
    { id: 1615, q: "What is an LSTM?", opts: ["Long Short-Term Memory network","Large System Training Module","Layer-wise Summary Training Method","Linear Sequence Training Model"], ans: 0, diff: "hard", explanation: "LSTMs are RNN variants that can learn long-term dependencies using gating mechanisms." },
    { id: 1616, q: "What is a transformer architecture?", opts: ["A type of activation function","A neural architecture using self-attention","A regularization technique","A loss function"], ans: 1, diff: "hard", explanation: "Transformers use self-attention to process sequential data without recurrence." },
    { id: 1617, q: "What is the purpose of attention mechanisms?", opts: ["To reduce network size","To focus on relevant parts of input","To speed up training","To initialize weights"], ans: 1, diff: "hard", explanation: "Attention allows models to focus on the most relevant parts of the input for each output." },
    { id: 1618, q: "What is a convolutional layer in CNN?", opts: ["A fully connected layer","A layer applying filters to extract features","A pooling layer","A normalization layer"], ans: 1, diff: "hard", explanation: "Convolutional layers apply learned filters to detect spatial patterns in images." },
  ],
};

export const FLASHCARD_DATA = {
  "Data Structures": [
    { front: "What is a Stack?", back: "A LIFO (Last In, First Out) linear data structure where insertion and deletion happen at the same end called the top." },
    { front: "What is Big O Notation?", back: "A mathematical notation describing the upper bound of an algorithm's time/space complexity in terms of input size n." },
    { front: "What is a Binary Tree?", back: "A tree data structure where each node has at most two children — the left child and the right child." },
    { front: "Difference between BFS and DFS?", back: "BFS explores level by level using a queue. DFS explores as deep as possible using a stack (or recursion)." },
    { front: "What is Hashing?", back: "A technique mapping data to a fixed-size array index via a hash function, enabling O(1) average-case lookup." },
    { front: "What is a Queue?", back: "A FIFO (First In, First Out) data structure. Elements are added at the rear (enqueue) and removed from the front (dequeue)." },
    { front: "What is Dynamic Programming?", back: "An optimization technique that solves complex problems by breaking them into simpler subproblems and storing results (memoization/tabulation)." },
  ],
  "SQL": [
    { front: "What is a PRIMARY KEY?", back: "A unique identifier for each record in a table. It cannot be NULL and must be unique across all rows." },
    { front: "What is a FOREIGN KEY?", back: "A column referencing the primary key of another table, enforcing referential integrity between tables." },
    { front: "DELETE vs TRUNCATE?", back: "DELETE removes rows one by one (logged, rollback-able). TRUNCATE removes all rows instantly (minimal logging, usually irreversible)." },
    { front: "What is ACID?", back: "Atomicity, Consistency, Isolation, Durability — four properties guaranteeing reliable database transaction processing." },
    { front: "What is Normalization?", back: "Organizing database columns and tables to reduce data redundancy and improve integrity through 1NF, 2NF, 3NF forms." },
    { front: "What is an INDEX?", back: "A database object that speeds up data retrieval by creating a lookup structure (B-tree) for one or more columns." },
  ],
  "C Programming": [
    { front: "What is a pointer in C?", back: "A variable storing the memory address of another variable. Declared with * e.g., int *ptr = &x;" },
    { front: "malloc() vs calloc()?", back: "malloc(size) allocates uninitialized memory. calloc(n, size) allocates for n elements and initializes all bytes to zero." },
    { front: "What is a NULL pointer?", back: "A pointer not pointing to valid memory (set to 0/NULL). Always check before dereferencing to avoid segfault." },
    { front: "What is a struct?", back: "A user-defined type grouping related variables of different types. Access members with dot (.) or arrow (->) for pointers." },
    { front: "Static vs Auto variable?", back: "Auto variables live on the stack, destroyed when scope ends. Static variables persist for the program's lifetime, initialized once." },
  ],
  "C++": [
    { front: "What is a Constructor?", back: "A special method called automatically when an object is created. Same name as the class, no return type, can be overloaded." },
    { front: "What is Polymorphism?", back: "The ability of different objects to respond to the same interface differently — via virtual functions (runtime) or overloading (compile-time)." },
    { front: "What is a virtual function?", back: "A function declared 'virtual' in a base class, allowing derived classes to override it. Enables runtime dispatch via vtable." },
    { front: "What is the STL?", back: "Standard Template Library — provides containers (vector, map, set), algorithms (sort, find, transform), and iterators." },
    { front: "What is operator overloading?", back: "Defining custom behavior for operators (+, -, ==, <<, etc.) when used with user-defined types/classes in C++." },
  ],
  "Machine Learning": [
    { front: "What is Gradient Descent?", back: "An optimization algorithm iteratively adjusting parameters in the direction of the negative gradient to minimize a loss function." },
    { front: "What is Regularization?", back: "Techniques (L1/Lasso, L2/Ridge) adding a penalty to the loss function to prevent overfitting by discouraging large weights." },
    { front: "What is a Confusion Matrix?", back: "A table showing TP (True Positive), TN, FP, FN for a classification model — basis for accuracy, precision, recall, F1." },
    { front: "What is Overfitting?", back: "Model memorizes training data (including noise) and fails to generalize to unseen data. Fix: more data, regularization, dropout." },
    { front: "Bias vs Variance?", back: "Bias = error from wrong assumptions (underfitting). Variance = sensitivity to training data (overfitting). Goal: minimize both." },
  ],
  "Python": [
    { front: "What is a List Comprehension?", back: "[expr for item in iterable if condition] — a concise, Pythonic way to create lists from iterables." },
    { front: "What is a Decorator?", back: "A function that wraps another function to extend its behavior without modification. Uses @syntax and returns the wrapped function." },
    { front: "What is a Lambda function?", back: "An anonymous, single-expression function. Syntax: lambda args: expression. Used for short callbacks and functional programming." },
    { front: "GIL in Python?", back: "Global Interpreter Lock — a mutex preventing multiple native threads from executing Python bytecode simultaneously in CPython." },
    { front: "What are *args and **kwargs?", back: "*args collects extra positional arguments as a tuple; **kwargs collects extra keyword arguments as a dictionary." },
  ],
  "React": [
    { front: "What is the Virtual DOM?", back: "React's in-memory representation of the DOM. React diffs it against the real DOM and batches minimal updates for performance." },
    { front: "useState hook?", back: "Returns [state, setState] — triggers re-render when state changes. Never mutate state directly; always use the setter." },
    { front: "useEffect hook?", back: "Handles side effects (API calls, subscriptions). Runs after render; cleanup function returned prevents memory leaks." },
    { front: "What is prop drilling?", back: "Passing props through multiple component layers that don't need them. Solution: Context API, Redux, or component composition." },
    { front: "useMemo vs useCallback?", back: "useMemo memoizes a computed value; useCallback memoizes a function reference. Both prevent unnecessary recalculations on re-render." },
  ],
};
