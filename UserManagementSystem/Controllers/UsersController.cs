using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace UserManagementSystem.Controllers
{
    public class UsersController : Controller
    {
        private readonly string filePath = "data.json";

        // Get all Users
        [HttpGet]
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
        [HttpPost]
        public ActionResult<User> Post([FromBody] User newUser)
        {
            var Users = ReadJsonFile();
            newUser.Id = Users.Max(i => i.Id) + 1;
            Users.Add(newUser);
            WriteJsonFile(Users);
            return CreatedAtAction(nameof(Get), new { id = newUser.Id }, newUser);
        }

        // Update User
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] User updatedUser)
        {
            var Users = ReadJsonFile();
            var User = Users.FirstOrDefault(i => i.Id == id);
            if (User == null)
            {
                return NotFound();
            }
            User.Name = updatedUser.Name;
            WriteJsonFile(Users);
            return NoContent();
        }

        // Delete User
        [HttpDelete("{id}")]
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
            using (var reader = new StreamReader(filePath))
            {
                var json = reader.ReadToEnd();
                return JsonConvert.DeserializeObject<List<User>>(json);
            }
        }

        private void WriteJsonFile(List<User> Users)
        {
            using (var writer = new StreamWriter(filePath))
            {
                var json = JsonConvert.SerializeObject(Users, Formatting.Indented);
                writer.Write(json);
            }
        }
    }
}