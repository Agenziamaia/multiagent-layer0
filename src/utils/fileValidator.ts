/**
 * File Validation Utility
 *
 * Provides type-safe file validation functions for existence, extension, and size checks.
 * All functions include defensive error handling and explicit TypeScript types.
 */

import * as fs from "fs";
import * as path from "path";

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

interface NodeError extends Error {
  code?: string;
}

function isNodeError(error: unknown): error is NodeError {
  return error instanceof Error;
}

/**
 * Validates if a file exists at the given path
 *
 * @param path - Absolute or relative path to the file
 * @returns true if the file exists, false otherwise
 *
 * @example
 * const exists = validateFileExists('./package.json');
 * if (exists) {
 *   console.log('File found');
 * }
 */
export function validateFileExists(filePath: string): boolean {
  try {
    return fs.existsSync(filePath);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(
      `Error checking file existence for "${filePath}": ${errorMessage}`,
    );
    return false;
  }
}

/**
 * Validates if a file has an allowed extension
 *
 * @param filename - Name of the file (with or without path)
 * @param allowed - Array of allowed extensions (e.g., ['.ts', '.js', '.json'])
 * @returns true if the file extension is in the allowed array, false otherwise
 *
 * @example
 * const isValid = validateFileExtension('app.ts', ['.ts', '.tsx']);
 * const isValidWithPath = validateFileExtension('./src/app.ts', ['.ts', '.tsx']);
 */
export function validateFileExtension(
  filename: string,
  allowed: string[],
): boolean {
  if (!filename || typeof filename !== "string") {
    console.error("Invalid filename: must be a non-empty string");
    return false;
  }

  if (!Array.isArray(allowed) || allowed.length === 0) {
    console.error("Invalid allowed extensions: must be a non-empty array");
    return false;
  }

  try {
    const ext = path.extname(filename).toLowerCase();
    const normalizedAllowed = allowed.map((extension) => {
      const normalized = extension.toLowerCase();
      return normalized.startsWith(".") ? normalized : `.${normalized}`;
    });

    return normalizedAllowed.includes(ext);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(
      `Error validating extension for "${filename}": ${errorMessage}`,
    );
    return false;
  }
}

/**
 * Validates if a file size is within the specified limit
 *
 * @param filePath - Absolute or relative path to the file
 * @param maxSizeBytes - Maximum allowed file size in bytes
 * @returns ValidationResult with isValid flag and optional error message
 *
 * @example
 * const result = validateFileSize('./large-file.txt', 1024 * 1024); // 1MB limit
 * if (result.isValid) {
 *   console.log('File size is acceptable');
 * } else {
 *   console.error(result.error);
 * }
 */
export function validateFileSize(
  filePath: string,
  maxSizeBytes: number,
): ValidationResult {
  if (!filePath || typeof filePath !== "string") {
    return {
      isValid: false,
      error: "Invalid file path: must be a non-empty string",
    };
  }

  if (typeof maxSizeBytes !== "number" || maxSizeBytes < 0) {
    return {
      isValid: false,
      error: "Invalid max size: must be a non-negative number",
    };
  }

  try {
    if (!fs.existsSync(filePath)) {
      return {
        isValid: false,
        error: `File not found: "${filePath}"`,
      };
    }

    const stats = fs.statSync(filePath);

    if (!stats.isFile()) {
      return {
        isValid: false,
        error: `Path is not a file: "${filePath}"`,
      };
    }

    const fileSize = stats.size;

    if (fileSize > maxSizeBytes) {
      const sizeMB = (fileSize / (1024 * 1024)).toFixed(2);
      const maxSizeMB = (maxSizeBytes / (1024 * 1024)).toFixed(2);

      return {
        isValid: false,
        error: `File size (${sizeMB} MB) exceeds maximum allowed size (${maxSizeMB} MB)`,
      };
    }

    return {
      isValid: true,
    };
  } catch (error) {
    if (isNodeError(error)) {
      if (error.code === "EACCES") {
        return {
          isValid: false,
          error: `Permission denied accessing file: "${filePath}"`,
        };
      }

      if (error.code === "ENOENT") {
        return {
          isValid: false,
          error: `File not found: "${filePath}"`,
        };
      }

      return {
        isValid: false,
        error: `Error validating file size: ${error.message}`,
      };
    }

    return {
      isValid: false,
      error: `Unknown error validating file size: ${String(error)}`,
    };
  }
}

/**
 * Comprehensive file validation that combines existence, extension, and size checks
 *
 * @param filePath - Absolute or relative path to the file
 * @param allowedExtensions - Array of allowed file extensions (e.g., ['.ts', '.js'])
 * @param maxSizeBytes - Maximum allowed file size in bytes
 * @returns ValidationResult with isValid flag and detailed error message
 *
 * @example
 * const result = validateFileComprehensive(
 *   './src/app.ts',
 *   ['.ts', '.tsx'],
 *   1024 * 1024 // 1MB
 * );
 */
export function validateFileComprehensive(
  filePath: string,
  allowedExtensions: string[],
  maxSizeBytes: number,
): ValidationResult {
  if (!validateFileExists(filePath)) {
    return {
      isValid: false,
      error: `File does not exist: "${filePath}"`,
    };
  }

  if (!validateFileExtension(filePath, allowedExtensions)) {
    const ext = path.extname(filePath);
    return {
      isValid: false,
      error: `File extension "${ext}" is not allowed. Allowed: ${allowedExtensions.join(", ")}`,
    };
  }

  const sizeResult = validateFileSize(filePath, maxSizeBytes);
  if (!sizeResult.isValid) {
    return sizeResult;
  }

  return {
    isValid: true,
  };
}
