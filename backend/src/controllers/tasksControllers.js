import Task from "../models/Task.js";

/* ================= GET ================= */
export const getAllTasks = async (req, res) => {
  const { filter = 'today' } = req.query;
  const now = new Date();
  let startDate;

  switch (filter) {
    case 'today': {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    }
    case 'week': {
      // Lấy thứ 2 (Monday) của tuần hiện tại
      const day = (now.getDay() + 6) % 7; // 0=Sun -> 6, 1=Mon -> 0, ...
      const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - day);
      startDate = monday;
      break; // <<< BẮT BUỘC
    }
    case 'month': {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    }
    case 'all':
    default: {
      startDate = null;
      break;
    }
  }

  const query = startDate ? { createdAt: { $gte: startDate } } : {};

  try {
    const result = await Task.aggregate([
      { $match: query },
      {
        $facet: {
          tasks: [{ $sort: { createdAt: -1 } }],
          activeCount: [{ $match: { status: 'active' } }, { $count: 'count' }],
          completedCount: [{ $match: { status: 'completed' } }, { $count: 'count' }],
        },
      },
    ]);

    const tasks = result?.[0]?.tasks ?? [];
    const activeCount = result?.[0]?.activeCount?.[0]?.count ?? 0;
    const completedCount = result?.[0]?.completedCount?.[0]?.count ?? 0;

    res.status(200).json({ tasks, activeCount, completedCount });
  } catch (error) {
    console.error('❌ Lỗi khi gọi getAllTasks:', error);
    res.status(500).json({ message: 'Lỗi hệ thống', error: error.message });
  }
};


/* ================= CREATE ================= */
export const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title không được để trống" });
    }

    const newTask = await Task.create({ title });
    res.status(201).json(newTask);
  } catch (error) {
    console.error("❌ Lỗi khi tạo task:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

/* ================= UPDATE ================= */
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, status, completedAt } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, status, completedAt },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Không tìm thấy task để cập nhật" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("❌ Lỗi khi update task:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

/* ================= DELETE ================= */
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Task.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "not found id to delete" });
    }

    res.status(200).json({ message: "delete sucess" });
  } catch (error) {
    console.error("❌ Lỗi khi xoá task:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};