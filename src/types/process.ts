
export type ProcessTemplate = {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  created_by: string;
  updated_at: string;
};

export type TemplateStep = {
  id: string;
  template_id: string;
  title: string;
  description: string | null;
  order_index: number;
  assignee_role: string;
  needs_upload: boolean;
  needs_confirmation: boolean;
  confirmation_type: 'checkbox' | 'text' | null;
  created_at: string;
  updated_at: string;
};

export type Process = {
  id: string;
  template_id: string;
  name: string;
  status: 'active' | 'completed' | 'cancelled';
  started_at: string;
  completed_at: string | null;
  created_by: string;
  updated_at: string;
};

// Neue Typen für INSERT und UPDATE Operationen
export type NewProcess = {
  template_id: string;
  name: string;
  created_by: string;
  status?: 'active' | 'completed' | 'cancelled';
  started_at?: string;
  completed_at?: string | null;
  updated_at?: string;
};

export type ProcessStep = {
  id: string;
  process_id: string;
  template_step_id: string;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  assigned_to: string | null;
  completed_at: string | null;
  due_date: string | null;
  confirmation_data: any | null;
  upload_urls: string[];
  created_at: string;
  updated_at: string;
};
