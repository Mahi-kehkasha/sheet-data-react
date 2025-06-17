# Google Sheets Data Viewer & Bill of Quantities App

## Project Overview

This is a Proof of Concept (PoC) React.js web application designed to fetch and display tabular data from Google Sheets. It leverages the official Google Sheets API v4 for data retrieval and presents the data in an interactive [AG Grid](https://www.ag-grid.com/) table. A key feature includes a "Bill of Quantities" (BoQ) summary, allowing users to filter data within the grid and get a calculated total based on a 'Cost' column.

The primary purpose is to demonstrate:
*   Dynamic data consumption from Google Sheets using an API key.
*   Robust data display and client-side filtering with AG Grid.
*   Basic data aggregation (cost calculation) based on filtered views.
*   A clean and professional user interface built with Material-UI.

## Tech Stack Used

*   **Frontend Framework:** React.js
*   **Build Tool:** Vite
*   **UI Component Library / Design System:** Material-UI (MUI)
*   **HTTP Client:** Axios
*   **Data Grid Component:** AG Grid (ag-grid-react, ag-grid-community, @ag-grid-community/client-side-row-model, @ag-grid-community/core)

## Installation Instructions

To set up and run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [YOUR_REPOSITORY_URL_HERE]
    cd google-sheets-viewer
    ```
    (Replace `[YOUR_REPOSITORY_URL_HERE]` with the actual URL of your Git repository.)

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    This command will install all the necessary React, Material-UI, Axios, and AG Grid packages.

3.  **Google Cloud Project Setup:**
    To fetch data from Google Sheets, you need to configure a Google Cloud Project and obtain an API Key.
    *   Go to the [Google Cloud Console](https://console.cloud.google.com/).
    *   **Create a new project** or select an existing one.
    *   Navigate to **"APIs & Services" > "Library"** and **enable the "Google Sheets API"**.
    *   Go to **"APIs & Services" > "Credentials"** and **create a new "API key"**. Copy this key.
    *   **Important:** For testing, ensure your API key has no restrictions initially, or at least allows access to the Google Sheets API and is allowed from `http://localhost:5173/*` (or your development server's URL).

4.  **Configure Environment Variables:**
    Create a new file named `.env` in the **root directory** of your project (where `package.json` is located). Add your Google Sheets API key to this file:
    ```
    VITE_GOOGLE_SHEETS_API_KEY=YOUR_API_KEY_HERE
    ```
    Replace `YOUR_API_KEY_HERE` with the actual API key you copied from the Google Cloud Console.

## How to Run the Project

*   **Starting the development server:**
    ```bash
    npm run dev
    ```
    This will start the Vite development server, and the application will be accessible at `http://localhost:5173/` (or another port if 5173 is in use). **Always restart this server after making changes to `.env` files or installing new packages.**

*   **Building for production:**
    ```bash
    npm run build
    ```
    This command compiles the application for production, optimizing it for deployment. The output will be in the `dist/` directory.

*   **Previewing the production build (optional):**
    ```bash
    npm run preview
    ```
    This command serves the production build locally, allowing you to test it before deployment.

*   **Running tests:**
    Currently, no specific testing framework or scripts are configured for this Proof of Concept.

## Usage Instructions

1.  **Prepare Your Google Sheet:**
    *   **Get the Correct Sheet ID:** Open your Google Sheet in **editing mode** (`/edit` URL). The Sheet ID is the long string of characters located between `/d/` and `/edit/` in the URL (e.g., `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit`).
    *   **Publish to Web:** Go to `File > Share > Publish to web`. Ensure the *specific sheet tab* (e.g., "Sheet1", "Remaining Work") or "Entire Document" is selected and published. This is crucial for API Key access.
    *   **Share Permissions:** For best compatibility with API keys, ensure your Google Sheet's sharing settings allow "Anyone with the link" to "Viewer" access (via the "Share" button at the top right).
    *   **Headers:** The first row of your sheet should contain headers (e.g., `Category`, `Item`, `Area`, `Cost`, `Brand`). Ensure a `Cost` column exists if you want the BoQ summary to work.

2.  **Using the Application:**
    *   Once the development server is running, open the application in your browser.
    *   Enter the **correct Sheet ID** obtained from your Google Sheet's editing URL.
    *   Enter the **Sheet Range** (e.g., `Sheet1!A:Z` or `YourTabName!A1:E100`). Ensure the tab name is an **exact, case-sensitive match** to your sheet's tab.
    *   Click the "Load Sheet" button.

3.  **Features:**
    *   **Data Display:** Your Google Sheet data will appear in an interactive AG Grid table.
    *   **Filtering:** Use the input boxes directly below each column header in the AG Grid to filter data (e.g., type "Tiles" in the "Category" filter). The "Total Calculated Cost" will update dynamically.
    *   **Sorting & Resizing:** Click on column headers to sort, and drag column edges to resize.
    *   **Bill of Quantities Summary:** Below the grid, the total sum of the 'Cost' column for the *currently filtered data* will be displayed.

## Design System Guidelines

This project utilizes **Material-UI (MUI)** as its design system. MUI provides a comprehensive suite of pre-built React components that follow Google's Material Design guidelines, ensuring a consistent and aesthetic user interface.

*   **Custom Theme:** A custom MUI theme is defined in `src/theme.js`. This file centralizes global styles, color palettes, typography, and component-specific overrides.
*   **Customization:** You can easily customize the application's look and feel by modifying the `src/theme.js` file to adjust colors, fonts, spacing, and component behaviors.

## Contributing (Optional)

Contributions are welcome! If you find issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License and Credits (Optional)

This project is open-sourced under the MIT License.

Developed as a Proof of Concept React.js application for displaying Google Sheets data.
