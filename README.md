## Getting Started

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Reflection Questions

- What did you choose to mock the API and why?  
  I used Next.js api to return dummy data. My initial thought of using that is because of the flexibility to extend more functionality if there is time remaining

- If you used an AI tool, what parts did it help with?  
  I used github copilot autocomplete in VSCode to speed up the typing and using the code suggestion when it is accurate. I also used Claude to generate initial code for the UI component presentation

- What tradeoffs or shortcuts did you take?  
  I tried to implement best practice at the start of the test, however as time passes and I do not have enough time to complete the test, I hardcoded the typing and also put everything in the same component, instead of splitting it into small and reusable component

- What would you improve or add with more time?  
  First, I have to complete all the requirements listed (There are several that I do not have enough time to complete it), then I will do proper typing along with Zod + React Hook Form schema validation, as well as splitting and organize the component to smaller for it to be reusable and avoid rerendering

- What was the trickiest part and how did you debug it?  
  The trickiest part is when the polling results does not displayed, and I have to add console.log in multiple place to see where it goes wrong
