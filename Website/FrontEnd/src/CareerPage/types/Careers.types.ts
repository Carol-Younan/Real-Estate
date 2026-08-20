export interface FormData {
  fullName: string;
  email: string;
  phone: string;
  cv: File | null;
}

export interface Message {
  type: "success" | "error" | "";
  text: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  data?: {
    id: string;
    fullName: string;
    email: string;
    submittedAt: string;
  };
}