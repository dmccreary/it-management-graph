# P5.js Funnel Infographic Template

<iframe src="./main.html" width="100%" height="720px" scrolling="no"></iframe>

[View Infographic Fullscreen](./main.html){ .md-button .md-button--primary }

A generic, data-driven infographic visualization built with p5.js. This template loads all configuration and content from a `data.json` file, making it easy to customize for different use cases.

## Features

- **Data-Driven**: All content loaded from `data.json` - no code changes needed to customize
- **Interactive Hover**: Detailed descriptions appear when hovering over funnel stages
- **Responsive Design**: Automatically adapts to different screen sizes
- **Side Panels**: Configurable left and right panels for forms and dashboards
- **Visual Flow**: Shows progression through stages with arrows and numbered steps
- **Customizable Colors**: Each stage can have its own color scheme
- **Professional Look**: Modern, clean design with smooth interactions

## How It Works

The infographic consists of three main components:

1. **Central Funnel**: A vertical funnel visualization showing stages narrowing from top to bottom
2. **Left Panel**: Typically used for input forms or entry points
3. **Right Panel**: Typically used for metrics, dashboards, or summaries

All text, colors, and content are defined in `data.json`, making it trivial to repurpose this template for different processes or workflows.

## File Structure

```
p5-infographic-template/
├── data.json       - All configuration and content
├── script.js       - P5.js visualization logic
├── main.html       - Minimal HTML wrapper
└── index.md        - Documentation (this file)
```

## Customizing the Infographic

To create your own funnel infographic:

1. **Copy the directory** and give it a new name
2. **Edit `data.json`** with your content:
   - Update the title and description
   - Define your funnel stages (name, color, description)
   - Configure left and right panels
   - Customize colors and text
3. **No code changes needed!** The visualization automatically adapts

### Data Structure

The `data.json` file contains:

- `title`: Main heading displayed at the top
- `description`: Accessibility description
- `background`: Canvas background color
- `funnelStages`: Array of stages, each with:
  - `name`: Full name (shown in hover)
  - `shortLabel`: Brief label (shown on stage)
  - `color`: Stage background color
  - `textColor`: Label text color
  - `description`: Detailed explanation (shown on hover)
- `leftPanel`: Input/form panel configuration
- `rightPanel`: Dashboard/summary panel configuration

## Use Cases

This template is ideal for visualizing:

- **Process flows**: Idea submission, approval workflows
- **Sales funnels**: Lead generation to conversion
- **Hiring pipelines**: Candidate screening stages
- **Product development**: Ideation to launch
- **Learning paths**: Course progression
- **Data pipelines**: ETL processes
- **Customer journeys**: Awareness to loyalty

## Example Customization

The current example shows a "GenAI Center of Excellence Idea Funnel" with 7 stages from training through deployment. To change it to a sales funnel, you would:

1. Update `title` to "Sales Pipeline"
2. Replace `funnelStages` with: Lead, Qualified, Demo, Proposal, Negotiation, Closed
3. Adjust `leftPanel` to show "New Lead Form"
4. Update `rightPanel` to show sales metrics

No JavaScript changes required!

## Technical Details

- Built with [p5.js](https://p5js.org/) v1.11.1
- Uses p5's `preload()` to load JSON data
- Responsive canvas that resizes with window
- Hover detection for interactive info boxes
- Accessible with ARIA labels

## Embedding

To embed this infographic in another page:

```html
<iframe src="https://dmccreary.github.io/it-management-graph/sims/p5-infographic-template/main.html"
  width="100%" height="720px" scrolling="no"
  style="border: 1px solid #ccc; border-radius: 8px;">
</iframe>
```

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## Learning Objectives

This template helps communicate:

- Sequential process flows
- Stage-by-stage progression
- Multiple entry and exit points
- Filtering/narrowing through stages
- Supporting information and metrics
- Interactive exploration of complex workflows
