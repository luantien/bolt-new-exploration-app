## 1. Scope
Explore the Bolt.New (BN) Coding Agent focus on these factors
- Prompt Interactions
- Token Consumptions
- Integrations: Git, Supabase and Netlify

## 2. Prompt Interaction & Token Consumption
- The evaluation involved a total token consumption of approximately 900,000 tokens.

### 2.1. Intialization Prompt
- The initial prompt was designed to create a monorepo containing both frontend and backend directories.
- Token Consumption: Approximately 60,000 - 90,000 tokens.
- Result Evaluation:
    - The generated frontend structure adhered to best practices for a React application, including distinct folders: 
        - Components: re-usable block such as Login Box, NavBar, SignUp, Learning Box.
        - Pages: page structure in the app.
        - Context: the BLoC (Business Logic Component) used for state management in a page or component.
        - Services: backend interation service.
    - The structure generated in backend is very simple, one `server.js` file only, which I figured out later that Bolt New try to create a function to ultilize the deployment netlify functions (serverless architecture).
    - The package installation scripts and dev startup scripts got some issues everytime which I later need to refactor to use frontend as main repo structure, refactor backend as netlify functions. The mono repo structure somewhat makes the BN LLM confuses.

```
# ORIGINAL PROMPT
Set up a new full-stack web application. Use **React** for the frontend and **Node.js with Express** for a lightweight backend. Organize the project with separate `frontend/` and `backend/` directories. For the frontend, create a basic client-side routing structure with `react-router-dom` to support a Home page and a placeholder for a Learning Module. For the backend, create a simple `server.js` that listens on port `3001` and has a root `/` endpoint returning "Backend is running.". Focus on minimal boilerplate and ensure the frontend can communicate with this backend. **Keep the code extremely simple and prioritize low token usage. Do not add any styling or complex features yet.**
```

### 2.2. 1st Iteration Prompt
Before this iteration, `GitHub` and `Supabase` integrations were configured. The `Enhance Prompt` feature was utilized for this step.
- Token Consumption: Approximately 30,000 - 50,000 tokens.
- Note: The daily token limit of 150,000 on the Free Tier was reached after this prompt.

```
# ORIGINAL PROMPT
Now, let's implement user authentication using **Supabase**.
**Frontend (`frontend/`):**
1.  Create `Login.js` and `Signup.js` components with basic email and password input fields and submit buttons.
2.  Implement a simple `AuthContext.js` for managing user session state (logged in/out).
3.  Integrate the Supabase JavaScript client (`@supabase/supabase-js`) for user signup and login. Use environment variables for Supabase URL and Anon Key.
4.  Redirect to the Home page upon successful login/signup.
5.  Add basic conditional rendering in `App.js` to show Login/Signup forms if not authenticated, and the Home page if authenticated.
**Backend (`backend/`):**
1.  No direct backend routes needed for basic Supabase auth (handled client-side).
**Important: Implement only the core authentication flow. No password reset, social login, or complex error handling. Keep the UI minimal and unstyled to conserve tokens.**
```

```
# ENHANCED PROMPT
Create a basic authentication system using Supabase with the following specifications:

Frontend (frontend/):

Create authentication components:

Login.js: Email/password form with login button
Signup.js: Email/password form with signup button
AuthContext.js: React context for managing auth state
Setup requirements:

Install @supabase/supabase-js
Create .env file with REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY
Initialize Supabase client in a separate config file
Implement core functionality:

User registration with email/password
User login with email/password
Session management using AuthContext
Protected route handling
Automatic redirect to Home page after successful auth
Logout functionality
App.js structure:

Wrap application with AuthProvider
Implement conditional rendering:
Show Login/Signup when user is not authenticated
Show Home page when user is authenticated
Technical Requirements:

Use React hooks (useState, useContext, useEffect)
Implement basic error handling for auth failures
Store Supabase session in AuthContext
Use async/await for Supabase auth calls
Keep UI minimal - only functional form elements
Focus on core auth flow without additional features
Expected Output:

Working authentication system
Ability to register new users
Ability to login existing users
Session persistence
Protected routes based on auth state
```

### 2.3. Cleanup Prompt

After six iterations, a cleanup prompt was used to simplify the repository. The agent performed the cleanup but also introduced an unexpected modification to the homepage layout.
```
# ORIGINAL PROMPT
Now, review the entire codebase for unnecessary complexity or excess code. Do not make any enhancement at this stage.
```

### 2.4. Key Observations

* **High-Cost Operations:** Initialization, refactoring, and cleanup tasks were the most token-intensive operations.
* **Prompt Specificity:** Providing highly specific context in every prompt is crucial. Ambiguous instructions can lead to unexpected and unwanted changes from the BN LLM.
* **UI Generation:** The agent excels at generating good UI with optimized code for simple layouts, such as a homepage, login/signup forms, and basic content pages. Further exploration is needed to assess its performance with more complex UI structures.
* **Backend Configuration:** The agent appears to default to hard-coded configurations for backend services and does not apply logging best practices unless explicitly instructed.

## 3. Integrations

### 3.1. GitHub Integration

The integration with GitHub is minimal and provides basic functionality:

* **Web Console Interaction:** Allows for creating, switching, and auto-syncing branches within the web container environment.
* **Lack of CLI Support:** There is no support for `git-cli` in either the native Bolt terminal or user-created terminals.
* **UI Refresh:** Changing the branch triggers a full refresh of the web console, which can disrupt workflow.
* **Automated Commits:** The agent automatically creates a new commit and pushes to the origin after every prompt-driven action (new, revert, rollback). This resulted in a high volume of commits (e.g., 30 commits in a 15-minute session) for a single iteration branch.

### 3.2. Supabase Integration

The integration with Supabase was seamless. After creating an organization and configuring the integration in the BN settings, the agent handled the remaining setup:

* Automatically pulled the Supabase URL and ANON_KEY and populated them in the `.env` file.
* Generated the necessary database migration scripts.
* Executed the migrations automatically.

### 3.3. Netlify Integration

- The Netlify integration also proved to be seamless, enabling direct deployment via prompts.
- An attempt to integrate the UI with Netlify Functions was unsuccessful (`feature/iteration-9`). The agent entered a loop of attempting to fix configuration issues, consuming over 200,000 tokens without resolution. This exploration has been suspended and will be revisited later using a separated repository structure.

## Reference:
- Sample App Deployment: https://prismatic-sfogliatella-69740e.netlify.app
- Sample Source Iteration: https://github.com/luantien/bolt-new-exploration-app
