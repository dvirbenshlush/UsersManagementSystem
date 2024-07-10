using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace UserManagementSystem.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsersController : Controller
    {

        private readonly IConfiguration _configuration;

        public UsersController  (IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private static readonly object fileLock = new object();

        // Get all Users
        [HttpGet("getAllUsers")]
        public ActionResult<IEnumerable<User>> Get()
        {
            var Users = ReadJsonFile();
            return Ok(Users);
        }

        // Get User by id
        [HttpGet("{id}")]
        public ActionResult<User> Get(int id)
        {
            var Users = ReadJsonFile();
            var User = Users.FirstOrDefault(i => i.Id == id);
            if (User == null)
            {
                return NotFound();
            }
            return Ok(User);
        }

        // Add new User
        [HttpPost("addUser")]
        public ActionResult<User> Post([FromBody] User newUser)
        {
            var Users = ReadJsonFile();
            newUser.Id = Users.Count == 0 ? 1 : Users.Max(i => i.Id) + 1;
            Users.Add(newUser);
            WriteJsonFile(Users);
            return CreatedAtAction(nameof(Get), new { id = newUser.Id }, newUser);
        }

        // Update User
        [HttpPut("updateUser")]
        public IActionResult Put(int id, [FromBody] User updatedUser)
        {
            var Users = ReadJsonFile();
            var User = Users.FirstOrDefault(i => i.Id == id);
            if (User == null)
            {
                return NotFound();
            }
            User.Name = updatedUser.Name;
            User.Email = updatedUser.Email;
            User.Password = updatedUser.Password;
            WriteJsonFile(Users);
            return NoContent();
        }

        // Delete User
        [HttpDelete("removeUser")]
        public IActionResult Delete(int id)
        {
            var Users = ReadJsonFile();
            var User = Users.FirstOrDefault(i => i.Id == id);
            if (User == null)
            {
                return NotFound();
            }
            Users.Remove(User);
            WriteJsonFile(Users);
            return NoContent();
        }

        private List<User> ReadJsonFile()
        {
            string filePath = _configuration["dataPath"];
            lock (fileLock)
            {
                if (!System.IO.File.Exists(filePath))
                    return new List<User>();

                var json = System.IO.File.ReadAllText(filePath);
                return JsonConvert.DeserializeObject<List<User>>(json);
            }
        }

        private void WriteJsonFile(List<User> Users)
        {
            string filePath = _configuration["dataPath"];
            lock (fileLock)
            {
                var json = JsonConvert.SerializeObject(Users, Formatting.Indented);
                System.IO.File.WriteAllText(filePath, json);
            }
        }
    }
}
