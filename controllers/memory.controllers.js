const Memory = require("../models/memory.js");
const MemoryTypes = require("../models/memoryTypes.js");

exports.addMemory = (req, res)=>{
	const { name, type } = req.body;
	const newMemoryTypes = new MemoryTypes[type]({
		name: name,
		owner: req.userId
	});
	newMemoryTypes.save((err, newMemoryTypesDocs)=>{
		const newMemory = new Memory({
			name: name,
			memory: newMemoryTypesDocs._id,
			memoryType: type,
			owner: req.userId
		});
		newMemory.save((err, memory)=>{
			if (err) {
	            return res.status(500).json({ message: err });
	        }
	        else{
	            console.log('memory creation success');
				res.json({ message: "memory creation success"})
	        }
		})
	})
}

exports.getMemories = (req, res)=>{
	Memory.find({ owner: req.userId }, (err, memories)=>{
		res.json({
			message: "loaded memories successfully",
			memories: memories
		})
	})
}

exports.getMemory = (req, res)=>{
	const { type, id} = req.params;
	MemoryTypes[type].find({ owner: req.userId }, (err, memories)=>{
		res.json({
			message: "loaded memories successfully",
			memories: memories
		})
	})
}