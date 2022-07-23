-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Jeu 26 Octobre 2017 à 13:53
-- Version du serveur :  5.7.19-0ubuntu0.16.04.1
-- Version de PHP :  7.0.22-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
--

-- --------------------------------------------------------

--
--

CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `temporaryPassword` varchar(255)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;


CREATE TABLE `pictures` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `file` varchar(255) NOT NULL,
  `alt` varchar(255) NOT NULL,
  `text_id` int NULL,
  `genres` enum(
    "carousel",
    "react",
    "javascript",
    "python",
    "elixir",
    "typescript",
    "SQL"
  ),
  `picSection` int NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;


CREATE TABLE `texts` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` varchar(255) NULL,
  `body` mediumtext NULL,
  `categories` enum(
    "react",
    "javascript",
    "python",
    "elixir",
    "typescript",
    "mysql"
  ) NOT NULL,
  `textSection` int NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

INSERT INTO
`texts` (`title`, `body`, `categories`, `textSection`)
VALUES (
  'useState',
'Whats going on in this line of code?
We are setting the initial name value as Use hooks!.
We are defining a function whose job is to modify name, called setName().
useState() returns these two things, so we are using array destructuring to capture them both in separatevariables.
You can see the name state in action right away. Add a value attribute to the forms input, and set its value to name.
Your browser will render Use hooks! inside the input.', 'react', 1),

('useRef', 'These refs have a default value of null because they will not have value until we attach them to their respective elements. 
To do that, we ll add an attribute of ref to each element, and set their values to the appropriately named ref objects.
', 'react', 2),

('useEffect', 'To use our refs for their intended purpose, we need to import another React hook:useEffect(). useEffect() 
is so named because it runs after React renders a given component, 
and will run any side-effects that we d like to add to the render process, which we cant run inside the main function body. 
useEffect() is useful in the current situation because we cannot focus on an element until after the <Todo /> component renders and React knows where our refs are.
useEffect() takes a function as an argument; this function is executed after the component renders. 
Lets see this in action; put the following useEffect() call just above the return statement in the body of Todo(), 
and pass into it a function that logs the words "side effect" to your console:', 'react', 3),

('ElixirIntro', 'When you install Elixir, you will have three new executables: iex, elixir and elixirc. 
If you compiled Elixir from source or are using a packaged version, you can find these inside the bin directory.
For now, let’s start by running iex (or iex.bat if you are on Windows PowerShell, where iex is a PowerShell command) which stands for Interactive Elixir. 
In interactive mode, we can type any Elixir expression and get its result. Let’s warm up with some basic expressions.
Photo erlang/otp..
Please note that some details like version numbers may differ a bit in your session; that’s not important. 
From now on iex sessions will be stripped down to focus on the code. To exit iex press Ctrl+C twice.
It seems we are ready to go! We will use the interactive shell quite a lot in the next chapters to get a bit more familiar with the language constructs and basic types, 
starting in the next chapter.', 'elixir', 1),

('Iterations', 
'Iterations
Loops offer a quick and easy way to do something repeatedly. This chapter of the JavaScript Guide introduces the different iteration statements available to JavaScript.
You can think of a loop as a computerised version of the game where you tell someone to take X steps in one direction, 
then Y steps in another. For example, the idea "Go five steps to the east" could be expressed this way as a loop', 'javascript', 1),

('Destructuring', 'For more complex assignments, the destructuring assignment syntax is a 
JavaScript expression that makes it possible to extract data from arrays or objects using a syntax that mirrors the construction of array and object literals.', 'javacript', 2),

('Expression Statement', 'With the help of expressions, we perform operations like addition, subtraction, 
concentration etc.In other words, it is a statement that returns a value.it is an expression if it appears
On the right side of an assignment,
As a parameter to a method call.
Note: An expression must have a return.', 'python', 1),

('Intro Typescript', 'TypeScript is a superset of JavaScript that provides features such as optional static typing, classes, interfaces, and generics. 
The goal of TypeScript is to help catch mistakes early through its type system and make JavaScript development more efficient. 
One of the big benefits is enabling IDEs to provide a richer environment for spotting common errors as you type the code.
Best of all, JavaScript code is valid TypeScript code; TypeScript is a superset of JavaScript. 
You can rename most of your .js files to .ts files and they will just work.', 'typescript', 1),

('IntroSQL', 'SQL is a database computer language designed for the retrieval and management of data in a relational database. SQL stands for Structured Query Language. 
This tutorial will give you a quick start to SQL. It covers most of the topics required for a basic understanding of SQL and to get a feel of how it works.
Why to Learn SQL?
SQL is Structured Query Language, which is a computer language for storing, manipulating and retrieving data stored in a relational database.
SQL is the standard language for Relational Database System. All the Relational Database Management Systems (RDMS) like MySQL, MS Access, Oracle, Sybase, Informix, 
Postgres and SQL Server use SQL as their standard database language.', 'mysql', 1);

-- ('Intercal', 'INTERCAL was intended to be completely different from all other computer languages. Common operations in other languages have cryptic and redundant syntax in INTERCAL. 
-- From the INTERCAL Reference Manual,
-- It is a well-known and oft-demonstrated fact that a person whose work is incomprehensible is held in high esteem. For example, if one were to state that the simplest way to store a value of 65536 in a 32-bit INTERCAL variable is:', 'intercal', 1)

-- ('IntercalSuite', 'any sensible programmer would say that that was absurd. Since this is indeed the simplest method, the programmer would be made to look foolish in front of his boss, who would of course happen to turn up, as bosses are wont to do.
--  The effect would be no less devastating for the programmer having been correct.', 'intercal', 2);
--  ('IntercalEnd', 'INTERCAL has many other features designed to make it even more aesthetically unpleasing to the programmer: it uses statements such as "READ OUT", "IGNORE", "FORGET", and modifiers such as "PLEASE". This last keyword provides two reasons for the programs rejection by the compiler: 
--  if "PLEASE" does not appear often enough, the program is considered insufficiently polite, and the error message says this; 
--  if it appears too often, the program could be rejected as excessively polite. Although this feature existed in the original INTERCAL compiler, it was undocumented.', 'intercal', 3)


