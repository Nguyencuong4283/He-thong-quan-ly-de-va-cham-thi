package service;

import com.se104.backend.entity.Teacher;
import com.se104.backend.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.User;

import java.util.ArrayList;

@Service
public class TeacherDetailsService implements UserDetailsService {

    @Autowired
    private TeacherRepository teacherRepository;

    @Override
    public UserDetails loadUserByUsername(String teacherID) throws UsernameNotFoundException {
        Teacher teacher = teacherRepository.findById(teacherID)
                                           .orElseThrow(() -> new UsernameNotFoundException("Teacher not found with id: "+teacherID));

        return new User(teacher.getTeacherId(), teacher.getPassword(), new ArrayList<>());
    }
}
