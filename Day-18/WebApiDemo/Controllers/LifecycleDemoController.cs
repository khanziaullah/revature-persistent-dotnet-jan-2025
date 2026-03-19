using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/v1/[controller]")]
public class LifecycleController : ControllerBase
{
    SingletonClass _singletonClass;
    Service1 service1;
    Service2 service2;
    public LifecycleController(SingletonClass singletonClass,
    Service1 service1, Service2 service2)
    {
        _singletonClass = singletonClass;
        this.service1 = service1;
        this.service2 = service2;
    }

    [HttpGet]
    public async Task<IActionResult> GetLifecycleData()
    {
        var result = new
        {
            singletonClassHashCode = _singletonClass.GetHashCode(),
            singletonClassValues = _singletonClass.SingltonCount,

            servie1scoped = service1.ScopedClass.GetHashCode(),
            servie1transient = service1.TransientClass.GetHashCode(),

            servie2scoped = service2.ScopedClass.GetHashCode(),
            servie2transient = service2.TransientClass.GetHashCode(),
        };
        return Ok(result);
    }
}

public class ScopedClass
{
    public int ScopedCount { get; set; } = 100;

}

public class SingletonClass
{
    public int SingltonCount { get; set; } = 300;
}

public class TransientClass
{
    public int TransientCount { get; set; } = 300;
}

public class Service1
{
    public ScopedClass ScopedClass { get; set; }
    public TransientClass TransientClass { get; set; }
    public Service1(ScopedClass scopedClass, TransientClass transientClass)
    {
        ScopedClass = scopedClass;
        TransientClass = transientClass;
    }
}

public class Service2
{
    public ScopedClass ScopedClass { get; set; }
    public TransientClass TransientClass { get; set; }
    public Service2(ScopedClass scopedClass, TransientClass transientClass)
    {
        ScopedClass = scopedClass;
        TransientClass = transientClass;
    }
}