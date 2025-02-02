import PropTypes from 'prop-types';

const StudentCard = ({ student }) => {
    return (
        <div className="bg-gray-700 p-4 rounded-lg shadow-md text-white">
            <h3 className="text-xl font-bold">{student.studentName}</h3>
            <p>CUET Application No: {student.cuetApplicationNo}</p>
            <p>Email: {student.email}</p>
            <p>Phone: {student.phone}</p>
            <p>Gender: {student.gender}</p>
            <p>Course: {student.course}</p>
        </div>
    );
};

StudentCard.propTypes = {
    student: PropTypes.shape({
        studentName: PropTypes.string.isRequired,
        cuetApplicationNo: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        gender: PropTypes.string.isRequired,
        course: PropTypes.string.isRequired,
    }).isRequired,
};

export default StudentCard;
