import MasterLayout from '@/admin/layouts/MasterLayout';
import { UserType } from '@/pwa/types/userType';
import { useForm } from '@inertiajs/react';
import * as bootstrap from 'bootstrap';
import { useEffect, useRef } from 'react';

interface AppNameProps {
    id: number;
    value: string;
}

const AppName = ({ user, appName }: { user: UserType; appName: AppNameProps | null }) => {
    const modalRef = useRef<bootstrap.Modal | null>(null);

    const { data, setData, patch, processing, errors, reset } = useForm({
        app_name: appName?.value || '',
    });

    // Inisialisasi & cleanup modal
    useEffect(() => {
        const modalEl = document.getElementById('editAppNameModal');
        if (modalEl) {
            modalRef.current = new bootstrap.Modal(modalEl);
        }
        return () => {
            modalRef.current?.dispose();
        };
    }, []);

    const openModal = () => {
        setData('app_name', appName?.value || '');
        modalRef.current?.show();
    };

    const closeModal = () => {
        modalRef.current?.hide();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('admin.app-name.update'), {
            onSuccess: () => closeModal(),
            onError: (e) => console.log(e),
        });
    };

    return (
        <MasterLayout user={user}>
            <h6 className="fw-semibold mb-24">App Name</h6>
            <div className="col-xxl-12 col-xl-12">
                <div className="card h-100">
                    <div className="card-body p-24">
                        <div className="row row-cols-1 g-24">
                            <div>
                                <div className="bg-light rounded p-4 text-center">
                                    {appName && appName.value ? (
                                        <div>
                                            <h4 className="text-primary">{appName.value}</h4>
                                            <p className="text-muted">Current application name</p>
                                        </div>
                                    ) : (
                                        <p className="text-muted">Nama aplikasi belum diatur.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="row row-cols-1 mt-3">
                            <div>
                                <button type="button" className="btn btn-success" onClick={openModal}>
                                    {appName ? 'Edit App Name' : 'Set App Name'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Edit App Name */}
            <div
                className="modal fade"
                id="editAppNameModal"
                tabIndex={-1}
                aria-labelledby="editAppNameModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editAppNameModalLabel">
                                Edit App Name
                            </h5>
                            <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="appNameInput" className="form-label">
                                        Application Name
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.app_name ? 'is-invalid' : ''}`}
                                        id="appNameInput"
                                        value={data.app_name}
                                        onChange={(e) => setData('app_name', e.target.value)}
                                        placeholder="Enter application name"
                                        required
                                    />
                                    {errors.app_name && (
                                        <div className="invalid-feedback">{errors.app_name}</div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <small className="text-muted">
                                        This name will be displayed throughout the application.
                                    </small>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-success" disabled={processing}>
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </MasterLayout>
    );
};

export default AppName;