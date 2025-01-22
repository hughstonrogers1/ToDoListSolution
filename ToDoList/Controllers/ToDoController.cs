using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ToDoList.Controllers
{
    public class ToDoController : Controller
    {
        private static List<string> Tasks = new List<string>();

        public IActionResult Index()
        {
            ViewBag.Tasks = Tasks;
            return View("~/Views/Home/Index.cshtml");
        }
         
        [HttpPost]
        public IActionResult AddTask(string TaskDescription)
        {
            if (!string.IsNullOrWhiteSpace(TaskDescription))
            {
                Tasks.Add(TaskDescription);
            }
            return RedirectToAction("Index");
        }

        [HttpPost]
        public IActionResult DeleteTask(string TaskDescription)
        {
            if (!string.IsNullOrWhiteSpace(TaskDescription))
            {
                Tasks.Remove(TaskDescription);
            }
            return Json(new { success = true });
        }

        //private readonly AppDbContext _context;

        //public ToDoController(AppDbContext context)
        //{
        //    _context = context;
        //}

        //public async Task<IActionResult> Index()
        //{
        //    var items = await _context.ToDoItems.ToListAsync();
        //    return View(items);
        //}


    }
}
 