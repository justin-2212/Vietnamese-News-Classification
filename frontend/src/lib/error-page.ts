export function renderErrorPage(): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Error</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
        "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica",
        "Arial", sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    
    .error-container {
      background: white;
      border-radius: 8px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      padding: 40px;
      max-width: 500px;
      width: 100%;
      text-align: center;
    }
    
    .error-code {
      font-size: 64px;
      font-weight: bold;
      color: #667eea;
      margin-bottom: 10px;
    }
    
    .error-title {
      font-size: 24px;
      font-weight: 600;
      color: #333;
      margin-bottom: 10px;
    }
    
    .error-message {
      font-size: 14px;
      color: #666;
      margin-bottom: 30px;
      line-height: 1.6;
    }
    
    .error-actions {
      display: flex;
      gap: 10px;
      justify-content: center;
    }
    
    .btn {
      padding: 10px 24px;
      border-radius: 4px;
      border: none;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      display: inline-block;
    }
    
    .btn-primary {
      background: #667eea;
      color: white;
    }
    
    .btn-primary:hover {
      background: #5568d3;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }
    
    .btn-secondary {
      background: #f0f0f0;
      color: #333;
    }
    
    .btn-secondary:hover {
      background: #e0e0e0;
    }
  </style>
</head>
<body>
  <div class="error-container">
    <div class="error-code">500</div>
    <div class="error-title">Internal Server Error</div>
    <div class="error-message">
      Something went wrong on our end. Please try again later or contact support if the problem persists.
    </div>
    <div class="error-actions">
      <button class="btn btn-primary" onclick="window.location.href='/'">Go Home</button>
      <button class="btn btn-secondary" onclick="window.location.reload()">Reload</button>
    </div>
  </div>
</body>
</html>
  `.trim();
}
