import apiClient, { API_BASE_URL } from './axiosInstance';
import { mockProductionLogs, mockUsers } from './mockData';
import { createEmptyFormData, TPM_LOSS_CATEGORIES } from '../types/models';

export { apiClient, API_BASE_URL };

// Flag to toggle between Real Backend API calls and local Mock fallback
const USE_MOCK_FALLBACK = true;

// Simulate network delay for mock mode
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// ─── AUTH ────────────────────────────────────────────────────
export async function apiLogin(username, password) {
  if (!USE_MOCK_FALLBACK) {
    try {
      const res = await apiClient.post('/auth/login', { username, password });
      return res.data;
    } catch (err) {
      console.warn('Backend API login failed, falling back to mock authentication if enabled');
      if (USE_MOCK_FALLBACK) throw err;
    }
  }

  await delay(800);
  if (!username || !password) throw new Error('Username and password are required');
  const foundUser = mockUsers.find(u => u.username.toLowerCase() === username.toLowerCase());
  if (foundUser) {
    return { ...foundUser, token: 'mock-jwt-' + Date.now() };
  }
  const isAdminUser = username.toLowerCase().includes('admin') || username.toLowerCase().includes('supervisor');
  return {
    id: Date.now(),
    username,
    fullName: username,
    role: isAdminUser ? 'admin' : 'employee',
    department: 'Production',
    token: 'mock-jwt-' + Date.now(),
  };
}

// ─── PRODUCTION LOGS ─────────────────────────────────────────
export async function getProductionLogs(filters = {}) {
  if (!USE_MOCK_FALLBACK) {
    try {
      const res = await apiClient.get('/production-logs', { params: filters });
      return res.data;
    } catch (err) {
      console.warn('Backend API fetch failed:', err);
    }
  }

  await delay(400);
  let logs = [...mockProductionLogs];

  if (filters.userId) {
    logs = logs.filter(l => l.uploadedById === String(filters.userId));
  }
  if (filters.dateFrom) {
    logs = logs.filter(l => l.date >= filters.dateFrom);
  }
  if (filters.dateTo) {
    logs = logs.filter(l => l.date <= filters.dateTo);
  }
  if (filters.shift) {
    logs = logs.filter(l => l.shift === filters.shift);
  }
  if (filters.machineNo) {
    logs = logs.filter(l => l.machineNo.toLowerCase().includes(filters.machineNo.toLowerCase()));
  }
  if (filters.search) {
    const s = filters.search.toLowerCase();
    logs = logs.filter(l =>
      l.uploadedBy.toLowerCase().includes(s) ||
      l.partNo1.toLowerCase().includes(s) ||
      l.machineNo.toLowerCase().includes(s)
    );
  }

  return logs;
}

export async function getProductionLogById(id) {
  if (!USE_MOCK_FALLBACK) {
    try {
      const res = await apiClient.get(`/production-logs/${id}`);
      return res.data;
    } catch (err) {
      console.warn('Backend API fetch by ID failed:', err);
    }
  }

  await delay(300);
  const log = mockProductionLogs.find(l => l.id === Number(id));
  if (!log) throw new Error('Log not found');
  return log;
}

export async function submitProductionLog(data) {
  if (!USE_MOCK_FALLBACK) {
    try {
      const res = await apiClient.post('/production-logs', data);
      return res.data;
    } catch (err) {
      console.warn('Backend API submit failed:', err);
    }
  }

  await delay(1000);
  const newLog = {
    ...data,
    id: 1000 + mockProductionLogs.length + 1,
  };
  mockProductionLogs.unshift(newLog);
  return newLog;
}

export async function updateProductionLog(id, data) {
  if (!USE_MOCK_FALLBACK) {
    try {
      const res = await apiClient.put(`/production-logs/${id}`, data);
      return res.data;
    } catch (err) {
      console.warn('Backend API update failed:', err);
    }
  }

  await delay(600);
  const idx = mockProductionLogs.findIndex(l => l.id === Number(id));
  if (idx === -1) throw new Error('Log not found');
  mockProductionLogs[idx] = { ...mockProductionLogs[idx], ...data };
  return mockProductionLogs[idx];
}

// ─── IMAGE UPLOAD (OCR) ──────────────────────────────────────
export async function uploadFormImage(file) {
  if (!USE_MOCK_FALLBACK) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await apiClient.post('/ocr/process', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    } catch (err) {
      console.warn('Backend OCR upload failed:', err);
    }
  }

  await delay(2500);

  const mockExtracted = createEmptyFormData();
  mockExtracted.date = new Date().toISOString().split('T')[0];
  mockExtracted.shift = 'A';
  mockExtracted.machineNo = 'MC-201';
  mockExtracted.qaCell = 'Cell A';
  mockExtracted.operationNumber = '10';
  mockExtracted.partNo1 = 'SVP-4521';
  mockExtracted.employeeNumbers = 'E-1012';
  mockExtracted.scheduledQuantity = '500';
  mockExtracted.uph = '55';
  mockExtracted.part1Production = {
    hr1: '52', hr2: '55', hr3: '48', hr4: '53', hr5: '50',
    hr6: '55', hr7: '51', hr8: '54', hr9: '49', total: '467',
  };
  mockExtracted.part1CastingRej = {
    hr1: '2', hr2: '1', hr3: '3', hr4: '0', hr5: '1',
    hr6: '0', hr7: '2', hr8: '1', hr9: '0', total: '10',
  };
  mockExtracted.supervisorName = 'M. Gupta';
  mockExtracted.shiftIncharge = 'R. Verma';

  mockExtracted.tpmLosses = TPM_LOSS_CATEGORIES.map((cat, i) => ({
    ...cat,
    hourlyValues: {
      hr1: i === 0 ? '5' : '', hr2: '', hr3: i === 6 ? '8' : '',
      hr4: '', hr5: '', hr6: i === 16 ? '12' : '',
      hr7: '', hr8: '', hr9: '',
    },
  }));

  return mockExtracted;
}

// ─── USERS MANAGEMENT ────────────────────────────────────────
export async function getUsers() {
  if (!USE_MOCK_FALLBACK) {
    try {
      const res = await apiClient.get('/users');
      return res.data;
    } catch (err) {
      console.warn('Backend API getUsers failed:', err);
    }
  }

  await delay(400);
  return [...mockUsers];
}

export async function createUser(userData) {
  if (!USE_MOCK_FALLBACK) {
    try {
      const res = await apiClient.post('/users', userData);
      return res.data;
    } catch (err) {
      console.warn('Backend API createUser failed:', err);
    }
  }

  await delay(600);
  const newUser = {
    ...userData,
    id: Date.now(),
    createdDate: new Date().toISOString().split('T')[0],
    status: 'active',
  };
  mockUsers.push(newUser);
  return newUser;
}

export async function updateUser(id, userData) {
  if (!USE_MOCK_FALLBACK) {
    try {
      const res = await apiClient.put(`/users/${id}`, userData);
      return res.data;
    } catch (err) {
      console.warn('Backend API updateUser failed:', err);
    }
  }

  await delay(600);
  const idx = mockUsers.findIndex(u => u.id === id);
  if (idx === -1) throw new Error('User not found');
  mockUsers[idx] = { ...mockUsers[idx], ...userData };
  return mockUsers[idx];
}

export async function deleteUser(id) {
  if (!USE_MOCK_FALLBACK) {
    try {
      const res = await apiClient.delete(`/users/${id}`);
      return res.data;
    } catch (err) {
      console.warn('Backend API deleteUser failed:', err);
    }
  }

  await delay(400);
  const idx = mockUsers.findIndex(u => u.id === id);
  if (idx === -1) throw new Error('User not found');
  mockUsers.splice(idx, 1);
  return { success: true };
}
