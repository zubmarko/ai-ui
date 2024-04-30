
### Setup project. Chat 1. Basic Implementation 

Create a login form with React Hook Form for email and password fields, with validation using Yup.

Create two routes: 'sign-in' and 'dashboard' using React Router.

Implement fake authentication using useContext and useReducer.

Create a fake request to fetch data for the Dashboard component.

List the top 10 JavaScript frameworks including their name, GitHub stars, type (library or framework), pros, and cons.

Add a search input with an icon to search for frameworks by name in the Dashboard component.

Enable searching for frameworks by name in the Dashboard component.

Add an edit button above the table in the Dashboard component to toggle edit mode.

Make the table editable in the Dashboard component.

Validate the name with a minimum length of 2 and maximum length of 255 characters. Validate GitHub stars as a number.

Add a button to add a new record in the table in the Dashboard component.

Provide the ability to remove a table row in the Dashboard component.

Add a button to save changes made in the Dashboard component.

Add a button to cancel and discard changes made in the Dashboard component.

Store user authentication data in localStorage and clear it on logout.

### Setup project. Chat 2. Header
[source.zip]
Add Sticky Header component display user email from AuthContext
please use tailwind.css and add dropdown with LogoutButton inside dropdown

add logic to toggle dropdown

move user email to the right side

### Setup project. Chat 3. Logo, Header fixs

[source.zip]
add logo component to LoginForm above tag form, path to logo assets/logo.png
max width 100px
and center horizontally and small space below
use tailwind css

create logo as separate component and use max width as prop

please also add TypeScript

please also fix AuthContext component line with dispatch: React.Dispatch

In `Logo.tsxt` className={`max-w-[${maxWidth}] mb-4`} not working

please center <Logo horizontally

add space for Dashboard - Top JavaScript Frameworks
 in Dashboard
please replace Remove to delete icon

replace text Remove in line <button data-testid={`delete-framework-${index + 1}`} type="button" onClick={() => remove(index)} className="ml-2 text-red-500">Remove</button>

withe remove emoji icon and add Tooltip with text "Remove".
For tooltip use only tailwind.css 

please enhance tooltip and use only CSS3

please move Tooltip to separate component

could you center tooltip content horizontally

it's seems <div className="relative flex items-center"> hasn't class tooltip
and please use inline block

add animation for tooltip on hover


### Setup project. Chat 4. TS Auth Guard

[source.zip]
add auth guard for dashboard page

add TypeScript to AuthGuard

Argument of type 'Context<AuthContextType>' is not assignable to parameter of type 'Context<AuthState>'.

add fixed header component with email from AuthContext
and LogoutButton

### Setup project. Chat 5. TS LoginForm.jsx (ChatGPT failed couple times but finally added TS)

[LoginForm.jsx]
add suggestions to use TypeScript

use static type checking TypeScript best practices

please do

[LoginForm.jsx]
analyze code and add TypeScript

[LoginForm.jsx]
analyze code and add TypeScript