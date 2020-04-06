using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;


namespace Bif4.SasanJaghori.EmployeeApp
{
    [ApiController]
    [Route("api/employee")]
    public class EmployeeItemsController : ControllerBase
    {
        private readonly EmployeeDbContext dbContext;

        public EmployeeItemsController(EmployeeDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateToDoItem([FromBody] EmployeeItem employeeItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            employeeItem.Id = 0;
            dbContext.EmployeeItems.Add(employeeItem);

            var claims = User.Claims;
            employeeItem.UserSubject = claims.FirstOrDefault(c => c.Type == "sub")?.Value;
            employeeItem.Email = claims.FirstOrDefault(c => c.Type == "email")?.Value;
            employeeItem.Name = claims.FirstOrDefault(c => c.Type == "name")?.Value;

            await dbContext.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        public async Task<List<EmployeeItem>> ListEmployeeItems()
        {
            var items = await dbContext.EmployeeItems.ToListAsync();
            return items;
        }

        [HttpGet("{id}")]
        public async Task<EmployeeItem> GetEmployeeItem(int id)
        {
            return await dbContext.EmployeeItems.FindAsync(id);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await dbContext.EmployeeItems.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            var claims = User.Claims;
            if(item.UserSubject != claims.FirstOrDefault(c => c.Type == "sub")?.Value)
            {
                return Forbid();
            }

            dbContext.EmployeeItems.Remove(item);
            await dbContext.SaveChangesAsync();

            return Ok();
        }


    }

}
