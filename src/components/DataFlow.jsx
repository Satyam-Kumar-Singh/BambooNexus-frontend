import React from 'react';
import { Upload, Database, Settings, Globe, FileText, CheckCircle, AlertCircle, Loader2, X } from 'lucide-react';
import './style/DataFlow.CSS'; // Keep your existing CSS

const DataFlow = () => {
  return (
    <div className="container">
      <div className="header">
        <h1>DataFlow</h1>
        <p>Intelligent Document Ingestion & Vector Database Service</p>
      </div>

      <div className="main-content">
        {/* Database Configuration */}
        <div className="card">
          <h2>
            <div className="icon">DB</div>
            Database Configuration
          </h2>

          <form id="dbConfigForm">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="host">Host</label>
                <input type="text" id="host" name="host" placeholder="localhost" required />
              </div>
              <div className="form-group">
                <label htmlFor="port">Port</label>
                <input type="number" id="port" name="port" placeholder="5432" required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="database">Database Name</label>
              <input type="text" id="database" name="database" placeholder="my_vector_db" required />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" placeholder="admin" required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="••••••••" required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="dbType">Database Type</label>
              <select id="dbType" name="dbType" required>
                <option value="">Select Database Type</option>
                <option value="postgresql">PostgreSQL</option>
                <option value="mysql">MySQL</option>
                <option value="sqlite">SQLite</option>
                <option value="mongodb">MongoDB</option>
              </select>
            </div>

            <button type="submit" className="btn" style={{ width: '100%', marginTop: '10px' }}>
              Test Connection & Setup Schema
            </button>
          </form>

          <div id="connectionStatus" className="connection-status" style={{ display: 'none' }}></div>
        </div>

        {/* Processing Configuration */}
        <div className="card">
          <h2>
            <div className="icon">⚙️</div>
            Processing Settings
          </h2>

          <div className="form-group">
            <label htmlFor="chunkSize">Chunk Size (tokens)</label>
            <input type="number" id="chunkSize" defaultValue="512" min="100" max="2000" />
          </div>

          <div className="form-group">
            <label htmlFor="chunkOverlap">Chunk Overlap</label>
            <input type="number" id="chunkOverlap" defaultValue="50" min="0" max="500" />
          </div>

          <div className="form-group">
            <label htmlFor="embeddingModel">Embedding Model</label>
            <select id="embeddingModel">
              <option value="openai">OpenAI Ada-002</option>
              <option value="sentence-transformers">Sentence Transformers</option>
              <option value="huggingface">HuggingFace</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="apiKey">API Key (if required)</label>
            <input type="password" id="apiKey" placeholder="sk-..." />
          </div>
        </div>
      </div>

      {/* Document Upload Section */}
      <div className="upload-section">
        <h2
          style={{
            marginBottom: '30px',
            color: '#2d3748',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <div className="icon">📄</div>
          Document Ingestion
        </h2>

        <div className="tab-buttons">
          <div className="tab-btn active">Upload Files</div>
          <div className="tab-btn">Web URLs</div>
        </div>

        {/* File Upload Tab */}
        <div id="filesTab" className="tab-content">
          <div className="upload-area" id="uploadArea">
            <div className="upload-icon">📁</div>
            <h3 style={{ marginBottom: '10px', color: '#2d3748' }}>
              Drop files here or click to browse
            </h3>
            <p style={{ color: '#718096', marginBottom: '20px' }}>
              Upload your documents for processing and embedding
            </p>
            <button type="button" className="btn btn-secondary">
              Choose Files
            </button>
            <input
              type="file"
              id="fileInput"
              multiple
              accept=".pdf,.doc,.docx,.txt,.md"
              style={{ display: 'none' }}
            />
          </div>

          <div className="file-types">
            <div className="file-type">PDF</div>
            <div className="file-type">DOC/DOCX</div>
            <div className="file-type">TXT</div>
            <div className="file-type">Markdown</div>
          </div>
        </div>

        {/* URL Input Tab */}
        <div id="urlTab" className="tab-content" style={{ display: 'none' }}>
          <div className="form-group">
            <label htmlFor="urlInput">Website URLs or Blog Posts</label>
            <textarea
              id="urlInput"
              rows="4"
              placeholder={
                "https://example.com/blog/post1\nhttps://example.com/article\n\nEnter one URL per line"
              }
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                resize: 'vertical',
              }}
            ></textarea>
          </div>
          <button
            type="button"
            className="btn"
            style={{ width: '100%' }}
          >
            Process URLs
          </button>
        </div>

        <div id="progressSection" className="progress-section">
          <h4 style={{ marginBottom: '15px', color: '#2d3748' }}>Processing Documents...</h4>
          <div className="progress-bar">
            <div className="progress-fill" id="progressFill"></div>
          </div>
          <div className="status-indicator">
            <div className="spinner"></div>
            <span id="statusText">Extracting text from documents...</span>
          </div>
        </div>

        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <button
            type="button"
            className="btn"
            id="processBtn"
            style={{ padding: '15px 40px', fontSize: '16px' }}
          >
            Start Processing & Embedding
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataFlow;
