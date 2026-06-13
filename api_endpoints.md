# Proxmox Dashboard - API Endpoints Documentation

All requests and responses use the `application/json` format.
baseUrl = http://127.0.0.1:8000

## Global Headers
For all requests:
- `Content-Type: application/json`
- `Accept: application/json`

---

## 1. VM Listing & Creation

### List VMs
* **URL**: `/api/vms/`
* **Method**: `GET`
* **Payload**: None
* **Success Response (200 OK)**:
  ```json
  [
    {
      "id": "vm-82910",
      "name": "prod-db-master-01",
      "status": "Running",
      "cpu": "8 vCPU",
      "memory": "16 GB",
      "disk": "250 GB",
      "node": "us-east-1a-node-04",
      "ip": "10.0.4.15",
      "os": "Ubuntu 22.04 LTS",
      "provisioned": "12 days ago",
      "cpuUsage": "14.2%",
      "memoryAllocated": "6.4",
      "networkOut": "1.2 MB/s",
      "totalTransfer": "842 GB",
      "cpuHistory": [20, 35, 15, 45, 60, 30, 25, 14],
      "logs": [
        { "time": "10:42 AM", "title": "User started VM", "desc": "Initiated by administrator" }
      ]
    }
  ]
  ```

### Create VM
* **URL**: `/api/vms/`
* **Method**: `POST`
* **Payload Requirements**:
  ```json
  {
    "raw_id": "105",
    "name": "staging-worker-01",
    "os": "ubuntu-22",
    "cpu": 1,
    "memory": 2,
    "disk": 32
  }
  ```
  * `raw_id` (String, required): Unique numeric key suffix.
  * `name` (String, required): VM Name.
  * `os` (String, required): OS code. Choices: `"ubuntu-22"`, `"debian-11"`, `"centos-9"`.
  * `cpu` (Integer, required): Number of requested vCPUs.
  * `memory` (Integer, required): Size of RAM in GB.
  * `disk` (Integer, required): Size of storage disk in GB.
* **Success Response (201 Created)**: Returns the newly provisioned VM object details.

---

## 2. VM Details & Deletion

### Get VM Details
* **URL**: `/api/vms/<str:id>/` (e.g., `/api/vms/vm-105/`)
* **Method**: `GET`
* **Payload**: None
* **Success Response (200 OK)**: Returns the complete VM details object (JSON).

### Delete VM
* **URL**: `/api/vms/<str:id>/` (e.g., `/api/vms/vm-105/`)
* **Method**: `DELETE`
* **Payload**: None
* **Success Response (204 No Content)**: VM deleted from both Proxmox and local database.

---

## 3. VM Lifecycle Actions (Grouped)

These endpoints execute lifecycle operations on the virtual machine.

* **URLs**:
  - **Start VM**: `/api/vms/<str:id>/start/`
  - **Stop VM**: `/api/vms/<str:id>/stop/`
  - **Restart VM**: `/api/vms/<str:id>/restart/`
* **Method**: `POST`
* **Payload**: None
* **Success Response (200 OK)**: Returns the updated VM details object containing the updated status and active telemetry stats.
* **Error Response (400 Bad Request)**:
  ```json
  {
    "error": "VM is already running"
  }
  ```

---

## 4. Hardware Configuration & Administration

### Resize VM Specs
* **URL**: `/api/vms/<str:id>/resize/`
* **Method**: `PUT` or `PATCH`
* **Payload Requirements** (at least one parameter is required):
  ```json
  {
    "cpu": 2,
    "memory": 3,
    "disk": 50
  }
  ```
  * `cpu` (Integer, optional): New number of cores.
  * `memory` (Integer, optional): New RAM size in GB.
  * `disk` (Integer, optional): New storage size in GB.
* **Success Response (200 OK)**: Returns the updated VM details object showing modified hardware specifications.

### Archive VM Logs
* **URL**: `/api/vms/<str:id>/logs/archive/`
* **Method**: `POST`
* **Payload**: None
* **Success Response (200 OK)**:
  ```json
  {
    "status": "Logs archived successfully"
  }
  ```

### Global Metrics Refresh
* **URL**: `/api/vms/refresh/`
* **Method**: `POST`
* **Payload**: None
* **Success Response (200 OK)**:
  ```json
  {
    "status": "Metrics updated successfully"
  }
  ```
