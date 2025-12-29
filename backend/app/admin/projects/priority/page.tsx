"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { GripVertical, Save, RotateCcw } from 'lucide-react';
import { useToast } from '../../../components/ui/Toast';

interface Project {
    _id: string;
    title: string;
    slug: string;
    priority: number;
    images?: Array<{ url: string; showOnProject?: boolean }>;
}

export default function ProjectPriorityPage() {
    const router = useRouter();
    const toast = useToast();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    // Auth check
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('/api/auth/me', { credentials: 'include' });
                if (!res.ok) router.replace('/admin/login');
            } catch {
                router.replace('/admin/login');
            }
        })();
    }, [router]);

    // Fetch projects
    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/projects?limit=1000', { credentials: 'include' });
            const json = await res.json();

            if (json?.success && json.data?.items) {
                // Sort by current priority
                const sorted = json.data.items.sort((a: Project, b: Project) =>
                    (a.priority || 999) - (b.priority || 999)
                );
                setProjects(sorted);
            } else {
                toast.show('Failed to load projects', { type: 'error' });
            }
        } catch (err) {
            toast.show('Network error', { type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(projects);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        // Update priorities based on new order
        const updatedItems = items.map((item, index) => ({
            ...item,
            priority: index + 1
        }));

        setProjects(updatedItems);
        setHasChanges(true);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            // Prepare bulk update payload
            const updates = projects.map((project, index) => ({
                id: project._id,
                priority: index + 1
            }));

            const res = await fetch('/api/projects/priority', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ updates })
            });

            const json = await res.json();

            if (json?.success) {
                toast.show('✅ Priorities saved successfully!', { type: 'success' });
                setHasChanges(false);
            } else {
                toast.show(json?.message || 'Failed to save priorities', { type: 'error' });
            }
        } catch (err) {
            toast.show('Network error', { type: 'error' });
        } finally {
            setSaving(false);
        }
    };

    const handleReset = () => {
        fetchProjects();
        setHasChanges(false);
        toast.show('Reset to saved order', { type: 'info' });
    };

    if (loading) {
        return (
            <div className="p-6 max-w-7xl mx-auto">
                <div className="text-center py-12">Loading projects...</div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-3xl font-bold">Project Priority Order</h1>
                        <p className="text-sm text-gray-600 mt-2">
                            Drag and drop to reorder projects. Lower position = higher priority (appears first on homepage).
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={handleReset}
                            disabled={!hasChanges || saving}
                            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Reset
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={!hasChanges || saving}
                            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Save className="w-4 h-4" />
                            {saving ? 'Saving...' : 'Save Order'}
                        </button>
                    </div>
                </div>

                {hasChanges && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center gap-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-yellow-800 font-medium">
                            You have unsaved changes. Click "Save Order" to apply.
                        </span>
                    </div>
                )}
            </div>

            {/* Project Count */}
            <div className="mb-4 text-sm text-gray-600">
                Total Projects: <span className="font-bold">{projects.length}</span>
            </div>

            {/* Drag and Drop List */}
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="projects">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={`space-y-2 ${snapshot.isDraggingOver ? 'bg-blue-50' : ''}`}
                        >
                            {projects.map((project, index) => (
                                <Draggable key={project._id} draggableId={project._id} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            className={`flex items-center gap-4 p-4 bg-white border rounded-lg transition-all ${snapshot.isDragging ? 'shadow-xl ring-2 ring-blue-500' : 'shadow-sm hover:shadow-md'
                                                }`}
                                        >
                                            {/* Drag Handle */}
                                            <div
                                                {...provided.dragHandleProps}
                                                className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
                                            >
                                                <GripVertical className="w-5 h-5" />
                                            </div>

                                            {/* Priority Number */}
                                            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-100 text-blue-700 font-bold text-lg flex items-center justify-center">
                                                {index + 1}
                                            </div>

                                            {/* Project Image */}
                                            {project.images && project.images.length > 0 && (
                                                <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                                                    <img
                                                        src={project.images.find(img => img.showOnProject)?.url || project.images[0]?.url}
                                                        alt={project.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )}

                                            {/* Project Info */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-gray-900 truncate">{project.title}</h3>
                                                <p className="text-sm text-gray-500 truncate">{project.slug}</p>
                                            </div>

                                            {/* Current Priority Badge */}
                                            <div className="flex-shrink-0 px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                                                Priority: {project.priority || 999}
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            {/* Instructions */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold mb-3">How to use:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">1.</span>
                        <span>Drag projects up or down using the grip icon (⋮⋮) to reorder them</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">2.</span>
                        <span>Position 1 = First on homepage, Position 2 = Second, etc.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">3.</span>
                        <span>Click "Save Order" to apply changes to the website</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">4.</span>
                        <span>Click "Reset" to discard changes and reload the current order</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
