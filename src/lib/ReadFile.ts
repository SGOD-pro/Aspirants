// Utility function to read a file's content as text
export const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const content = e.target?.result as string;
        resolve(content); // Return file content
      };

      reader.onerror = () => {
        reject(new Error("Error reading the file"));
      };
  
      reader.readAsText(file);
    });
  };
  