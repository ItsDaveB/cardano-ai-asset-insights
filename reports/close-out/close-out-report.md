# Project Close-out Report

## Name of Project and Project URL on IdeaScale/Fund

**Name:** Cardano AI Asset Insights  
**URL:** [Project Catalyst URL](https://milestones.projectcatalyst.io/projects/1200022/milestones/4)

## Project Number

**Project ID:** 1200022

## Project Manager

**Name:** Dave

## Start Date

**01 February 2025**

## Completion Date

**12 July 2025**

---

## Project Summary

Cardano AI Asset Insights was developed to provide AI-generated trading intelligence for Cardano native assets. The project delivers a full-stack system that ingests real-time token data, processes it through large language models (LLMs), and serves the output via a responsive user interface and structured API.

Originally intended for deployment on ADA Markets, the project scope evolved to become a fully open source and reusable AI insights platform. The system is modular, environment-configurable, and built to support multiple LLM providers and evolving use cases across the Cardano ecosystem.

All deliverables have been completed, documented, and made publicly accessible to maximise community benefit and support future growth.

---

## Addressing the Challenge KPIs

### Increase access to on-chain analytics powered by AI

- Delivered a working backend pipeline that performs token selection, OHLC ingestion, and model-driven analysis.
- Integrated Gemini 2 and Gemini 2.5 via GCP Vertex AI to provide accurate, structured outputs.
- Open sourced the full stack to ensure others can build upon or deploy the system freely.

### Support developer adoption through open tooling

- Exposed a REST API and documented schema for fetching insights programmatically.
- Created debug profiles and clear environment configuration for easy local development.
- Provided support for plug-and-play LLM provider integration and example usage flows.

---

## Addressing the Project KPIs

### Real-time token-level insight generation

- Implemented a cron-based job that periodically fetches the top-volume Cardano tokens and processes them through LLMs.
- Stored structured analysis in PostgreSQL with support/resistance detection, trend and sentiment scores, and risk-weighted metrics.

### Visual frontend integration

- Built a modern, responsive UI in React and Tailwind CSS.
- Displayed insights using dynamic cards, radar and bubble charts, and token-level detail views.

### Flexible, modular backend architecture

- Designed a schema-driven prompt and response structure to support any LLM provider.
- Developed a modular LLM service to allow simple registration of new providers.
- Open sourced the architecture for community extension and transparency.

---

## Key Achievements

- Completed a fully operational full-stack application for Cardano-native AI analysis.
- Integrated Gemini 2.5 Flash (as an enhancement beyond the original scope).
- Open sourced all code, research, and tooling for broader ecosystem use.
- Engaged with the ADA Markets team and pivoted delivery to open infrastructure following their transition under Fetch.
- Built support for scalable, model-agnostic AI pipelines and flexible frontend rendering.
- Serverside caching complimented with client side caching improve performance and overall user experience.

---

## Key Learnings

- Designing a reusable AI architecture benefits significantly from a schema-driven approach, particularly when working with structured outputs across providers.
- Clear, modular documentation and examples greatly improve developer experience and accelerate adoption.
- Open sourcing added significantly more value than single-surface delivery, ensuring the project can evolve with the ecosystem.
- Incorporating real-world token data via TapTools provided reliable input for model evaluation and development.

---

## Next Steps

- Promote community reuse of the platform and encourage integration into additional Cardano applications.
- Evaluate alternative LLMs and further model performance strategies using the plug-and-play interface.
- Support ongoing feedback from Catalyst, developers, and data providers.

---

## Final Thoughts

Cardano AI Asset Insights was proposed to bring structured, AI-powered market insights to the Cardano community. Through both architectural design and delivery, the project now stands as a complete, documented, and open source asset for anyone seeking to build with or extend AI intelligence on-chain.

While the original target integration (ADA Markets) became unavailable due to a broader transition, the decision to open source the project has produced a more flexible and valuable outcome. I’m grateful for the support received through Project Catalyst, and I look forward to seeing how others build on this foundation.

---

## Links to Demonstrations, Reports, and Resources

### Video Demonstrations

- [Final Close-out Video](https://youtu.be/jZCvEnBEZo8)
- [Milestone 3 UI Integration Video](https://www.youtube.com/watch?v=wwYgbmr8BEw)
- [Milestone 2 Backend Integration Video](https://youtu.be/dL4XNo5C1Tc)

### Project Reports and Documentation

- [Project Design & Research – Milestone 1](https://github.com/ItsDaveB/cardano-ai-asset-insights-research/blob/main/reports/milestone-one/research-and-project-design.md)

### Codebase

- [cardano-ai-asset-insights GitHub Repository](https://github.com/ItsDaveB/cardano-ai-asset-insights)

---

## License

The project is licensed under the permissive [MIT License](https://github.com/ItsDaveB/cardano-ai-asset-insights/blob/main/LICENSE), allowing the software to be freely used, modified, and distributed for both personal and commercial use.
